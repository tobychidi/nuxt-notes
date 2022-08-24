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
   name: z.string().transform(val => { if (val.length == 0) { return "Untitled" } return val }),
   color: z.string().optional(),
})

export const createNote = z.object({
   title: z.string().transform(val => { if (val.length == 0) { return "Untitled Note" } return val }),
   content: z.string(),
   folder_id: z.number().int(),
})