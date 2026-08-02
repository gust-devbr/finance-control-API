import { z } from "zod"

export const updateUserSchema = z.object({
    name: z.string().optional(),
    email: z.email().optional(),
})

export type UpdateUserSchemaType = z.infer<typeof updateUserSchema>