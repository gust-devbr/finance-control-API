import { z } from "zod"
import { $Enums } from "@prisma/client"

export const createTransactionSchema = z.object({
    title: z.string(),
    amount: z.number(),
    type: z.enum($Enums.TransactionType),
    categoryId: z.string()
})

export type CreateTransactionSchemaType = z.infer<typeof createTransactionSchema>