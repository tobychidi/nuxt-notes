import { z } from "zod";

export const createUser = z.object({
   username: z.string(),
   email: z.string().email(),
   password: z.string().min(4),
})

export const loginUser = z.object({
   username: z.string(),
   password: createUser.shape.password,
});

export const createFolder = z.object({
   name: z.string(),
   color: z.string().optional(),
})

export const createNote = z.object({
   title: z.string(),
   content: z.string(),
   folder_id: z.number().int(),
})