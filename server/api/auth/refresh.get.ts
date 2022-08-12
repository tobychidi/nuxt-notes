import { PrismaClient } from "@prisma/client";
import { sendError } from "h3";
import { signJWT, signJWTRefreshToken, verifyAccessToken, verifyRefreshToken } from "~~/utils/auth";

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
   try {
      const accessToken = event.req.headers['authorization']?.split(' ')[1]
      // console.log("AccessToken", accessToken)
      if (!!accessToken) {
         const payload = await verifyAccessToken(accessToken)

         if (payload) return {
            is_valid: true,
            user: payload
         }
      }
      const { refresh_token: refreshToken } = useCookies(event)
      if (!refreshToken) {
         return sendError(event, createError({ statusCode: 401 }))
      }

      //Verify Legit Token

      const payload = await verifyRefreshToken(refreshToken)
      if (!payload) {
         return sendError(event, createError({ statusCode: 401 }))
      }

      const listed = await prisma.refreshToken.findFirst({
         where: {
            token: refreshToken,
         }
      })
      if (!listed) {
         return sendError(event, createError({ statusCode: 401 }))
      }

      await prisma.refreshToken.deleteMany({})

      const newAccessToken = await signJWT(payload)
      const newRefreshToken = await signJWTRefreshToken(payload)

      if (!refreshToken) {
         return sendError(event, createError({
            statusCode: 500
         }))
      }

      setCookie(event, "refresh_token", newRefreshToken.token, {
         httpOnly: true,
         sameSite: "strict",
      })

      return {
         access_token: newAccessToken,
         user: payload
      }

   } catch (error) {
      console.log(error);
      return sendError(event, createError({
         statusCode: 500
      }))
   }
})