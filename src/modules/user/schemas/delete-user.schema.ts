import { z } from "zod"

export const deleteUserSchema = z.object({
    password: z.string().trim(),
    confirmPassword: z.string(),
})

export type DeleteUserSchemaType = z.infer<typeof deleteUserSchema>