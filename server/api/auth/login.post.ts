import { User } from "@prisma/client"
import { sendError } from "h3"
import { prisma } from "~~/prisma/client"
import { encrypt, signJWT, signJWTRefreshToken } from "~~/utils/auth"
import { loginUser } from "~~/utils/validation/user"

const userError = createError({
   statusCode: 400, message: "Invalid Username or Password"
})

export default defineEventHandler(async (event) => {
   try {
      const data = loginUser.parse(await useBody(event))
      let user: User | null = null
      user = await prisma.user.findUnique({
         where: {
            email: data.username
         }
      })
      if (!user) {
         user = await prisma.user.findUnique({
            where: {
               username: data.username
            }
         })
      }
      if (!user) {
         return userError
      }
      if (!(encrypt(data.password) === user.password)) {
         return userError
      }
      const payload = {
         id: user.id,
         username: user.username,
         email: user.email,
      }
      const accessToken = await signJWT(payload)
      const refreshToken = await signJWTRefreshToken(payload)

      if (!refreshToken) {
         return sendError(event, createError({
            statusCode: 500
         }))
      }

      setCookie(event, "refresh_token", refreshToken.token, {
         httpOnly: true,
         sameSite: "strict",
      })
      return {
         access_token: accessToken,
         user: payload
      }
   } catch (error) {
      console.log(error)
   }
})