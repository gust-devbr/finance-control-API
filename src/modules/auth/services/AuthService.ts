import { SettingsRepository } from "@/modules/settings/repository/settings-repository.js";
import { RefreshTokenRepository } from "../repositories/refresh-token-repository.js";
import { UserRepository } from "@/modules/user/repository/UserRepository.js";

import type { CreateUserSchemaType } from "@/modules/user/schemas/create-user.schema.js";
import type { LoginUserSchemaType } from "../schemas/user-login.schema.js";

import { UserResponse } from "@/utils/UserResponse.js";
import { Password } from "@/utils/Password.js";
import { Jwt } from "@/utils/Jwt.js";

export class AuthService {
    constructor(
        private readonly userRepository = new UserRepository(),
        private readonly refreshRepository = new RefreshTokenRepository(),
        private readonly settingsRepository = new SettingsRepository()
    ) { }

    private createSession = async (userId: string) => {
        const accessToken = Jwt.generateAccessToken(userId)
        const refreshToken = Jwt.generateRefreshToken(userId)

        await this.refreshRepository.createToken(userId, refreshToken)

        return { accessToken, refreshToken }
    }

    register = async (body: CreateUserSchemaType) => {
        const { password, ...createData } = body

        const existingUser =
            await this.userRepository.findByEmail(createData.email)

        if (existingUser)
            throw new Error("E-mail já cadastrado")

        const hashed = await Password.hash(password)

        const user = await this.userRepository.create({
            password: hashed,
            ...createData
        })

        await this.settingsRepository.createSettings(user.id)

        const { accessToken, refreshToken } =
            await this.createSession(user.id)

        return {
            user: UserResponse.from(user),
            accessToken,
            refreshToken
        }
    }

    login = async (body: LoginUserSchemaType) => {
        const existingUser =
            await this.userRepository.findByEmail(body.email)

        if (!existingUser)
            throw new Error("Credenciais inválidas")

        if (!(await Password.compare(body.password, existingUser.password)))
            throw new Error("Credenciais inválidas")

        const { accessToken, refreshToken } =
            await this.createSession(existingUser.id)

        return {
            user: UserResponse.from(existingUser),
            accessToken,
            refreshToken
        }
    }

    logout = async (userId: string, refreshToken: string) => {
        if (refreshToken) {
            await this.refreshRepository.deleteToken(userId, refreshToken)
        }
    }

    refresh = async (refreshToken: string) => {
        const existsToken =
            await this.refreshRepository.findToken(refreshToken)

        if (!existsToken)
            throw new Error("Refresh Token não encontrado")

        try {
            const payload = Jwt.verifyRefreshToken(refreshToken)
            const accessToken = Jwt.generateAccessToken(payload.id)

            return accessToken
        } catch {
            return null
        }
    }

}