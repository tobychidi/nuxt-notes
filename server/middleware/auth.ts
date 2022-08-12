import { verifyAccessToken } from "~~/utils/auth"

export default defineEventHandler(async(event)=>{
   try {
      const accessToken = event.req.headers['authorization']?.split(' ')[1]

      if (!accessToken) {
         throw createError({statusCode: 401, statusMessage: "Unauthorized"})
      }
      const payload = await verifyAccessToken(accessToken)

      if(payload) event.context.auth = payload
   } catch (error) {
      
   }
})