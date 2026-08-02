import { z } from "zod"
import { $Enums } from "@prisma/client"

export const updateSettingsSchema = z.object({
    theme: z
        .enum($Enums.Theme, { error: "Tema inválido" })
        .optional(),

    itemsPerPage: z
        .number()
        .optional(),
})

export type UpdateSettingsSchemaType = z.infer<typeof updateSettingsSchema> 