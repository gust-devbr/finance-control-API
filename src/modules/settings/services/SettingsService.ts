import { UserRepository } from "@/modules/user/repository/UserRepository.js";
import { SettingsRepository } from "../repository/settings-repository.js";

import { UpdateSettingsSchemaType } from "../schemas/update-settings.schema.js";

export class SettingsService {
    constructor(
        private readonly settingsRepository = new SettingsRepository(),
        private readonly userRepository = new UserRepository()
    ) { }

    private findUser = async (userId: string) => {
        const user = await this.userRepository.findById(userId)
        if (!user) throw new Error("Usuário não encontrado")
        return user
    }

    getAll = async (userId: string) => {
        const user = await this.findUser(userId)
        return await this.settingsRepository.getAll(user.id)
    }

    updateSettings = async (userId: string, data: UpdateSettingsSchemaType) => {
        const user = await this.findUser(userId)
        return await this.settingsRepository.updateSettings(user.id, data)
    }

    resetSettings = async (userId: string) => {
        const user = await this.findUser(userId)
        return await this.settingsRepository.resetSettings(user.id)
    }

}