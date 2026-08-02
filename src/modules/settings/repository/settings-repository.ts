import { prisma } from "@/lib/prisma.js";

import { UpdateSettingsSchemaType } from "../schemas/update-settings.schema.js";

import { DEFAULT_SETTINGS } from "../constants/default-settings.js";

export class SettingsRepository {

    getAll = async (userId: string) => {
        return await prisma.userSettings.findFirst({ where: { userId } })
    }

    createSettings = async (userId: string) => {
        await prisma.userSettings.create({
            data: { userId, ...DEFAULT_SETTINGS }
        })
    }

    updateSettings = async (userId: string, data: UpdateSettingsSchemaType) => {
        return await prisma.userSettings.update({
            where: { userId },
            data: {
                ...(data.theme && { theme: data.theme }),
                ...(data.itemsPerPage && { itemsPerPage: data.itemsPerPage }),
            }
        })
    }

    resetSettings = async (userId: string) => {
        return await prisma.userSettings.update({
            where: { userId },
            data: DEFAULT_SETTINGS
        })
    }

}