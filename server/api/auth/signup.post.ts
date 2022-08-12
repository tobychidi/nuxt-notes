import { Prisma, PrismaClient } from '@prisma/client'
import { sendError } from 'h3'
import { encrypt } from '~~/utils/auth'
import { createUser } from "~~/utils/validation/user"

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
   try {
      const data = createUser.parse(await useBody(event))
      const user = await prisma.user.create({
         data: {
            email: data.email,
            username: data.username,
            password: encrypt(data.password)
         }
      })
      return {
         user: {
            username: user.username,
            email: user.email
         }
      }
   } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
         if (e.code === 'P2002') {
            const message = e.meta.target + " is already registered."

            return sendError(event, createError({ statusCode: 404, statusMessage: message }))
         }
      }
      console.log(e)
   }
})