import forge from "node-forge"
import { generateKeyPair, importJWK, JWTPayload, jwtVerify, KeyLike, SignJWT } from 'jose'
import { PrismaClient, User } from "@prisma/client";
import { AuthPayload } from "..";
import { CompatibilityEvent } from "h3";

const config = useRuntimeConfig()
let public_key: KeyLike = null;

const prisma = new PrismaClient()

export function encrypt(password: string): string {
   try {
      const salt = config.secretKeyP
      const saltedPassword = password + salt

      const md512 = forge.md.sha512.create().update(saltedPassword).digest().toHex()
      const md256 = forge.md.sha256.create().update(md512).digest().toHex()

      return md256
   } catch (error) {
      console.log(error)
   }
}

export async function signJWT(payload: AuthPayload) {
   try {
      const ALG = "ES256"
      const { publicKey, privateKey } = await generateKeyPair(ALG)
      public_key = publicKey
      const jwt = await new SignJWT(payload as unknown as JWTPayload)
         .setProtectedHeader({ alg: ALG })
         .setIssuedAt()
         .setIssuer('tobychidi.notes.ng')
         .setExpirationTime('2h')
         .sign(privateKey)

      return jwt

   } catch (error) {
      console.log(error)
   }
}

export async function verifyAccessToken(accessToken: string) {
   try {
      console.log("=======", public_key)
      const { payload } = await jwtVerify(accessToken, public_key)

      return payload as unknown as AuthPayload
   } catch (error) {
      console.log(error)
   }
}

export async function signJWTRefreshToken(payload: AuthPayload ) {
   try {
      const ALG = "HS256"

      const secret = await importJWK({
         k: config.secretKeyR,
         kty: 'oct',
      }, ALG)

      const jwt = await new SignJWT(payload as unknown as JWTPayload)
         .setProtectedHeader({ alg: ALG })
         .setIssuedAt()
         .setIssuer('tobychidi.notes.ng')
         .setExpirationTime('2h')
         .sign(secret)

      const savedToken = await prisma.refreshToken.create({
         data: {
            token: jwt,
            userId: payload.id
         }
      })

      return savedToken

   } catch (error) {
      console.log(error)
   }

}

export async function verifyRefreshToken(refreshToken: string) {
   try {
      const ALG = "HS256"

      const secret = await importJWK({
         k: config.secretKeyR,
         kty: 'oct',
      }, ALG)

      const { payload } = await jwtVerify(refreshToken, secret)

      return payload as unknown as AuthPayload

   } catch (error) {
      console.log(error)
   }
}

export function confirmUserContext(event: CompatibilityEvent){
   const user = event.context.auth as AuthPayload
   if (!user) throw createError({ statusCode: 401, statusMessage: "Unauthorized" })
   return user
}