import { z } from "zod"
import { $Enums } from "@prisma/client"

export const updateTransactionSchema = z.object({
    title: z.string().optional(),
    amount: z.number().optional(),
    type: z.enum($Enums.TransactionType).optional(),
    categoryId: z.string().optional()
})

export type UpdateTransactionSchemaType = z.infer<typeof updateTransactionSchema>