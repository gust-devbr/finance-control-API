import { $Enums } from "@prisma/client"
import { z } from "zod"

export const updateCategorySchema = z.object({
    name: z
        .string()
        .optional(),

    color: z
        .string()
        .optional(),

    icon: z
        .enum($Enums.CategoryIcon, { error: "Ícone inválido" })
        .optional(),
})

export type UpdateCategorySchemaType = z.infer<typeof updateCategorySchema>