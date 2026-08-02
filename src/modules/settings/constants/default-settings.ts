import { $Enums } from "@prisma/client";

export const DEFAULT_SETTINGS = {
    theme: $Enums.Theme.SYSTEM,
    itemsPerPage: 10
}