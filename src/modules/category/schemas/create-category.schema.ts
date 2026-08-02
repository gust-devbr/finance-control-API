import { $Enums } from "@prisma/client"
import { z } from "zod"

export const createCategorySchema = z.object({
    name: z.string(),
    color: z.string(),
    icon: z.enum($Enums.CategoryIcon, { error: "Ícone inválido" })
})

export type CreateCategorySchemaType = z.infer<typeof createCategorySchema>