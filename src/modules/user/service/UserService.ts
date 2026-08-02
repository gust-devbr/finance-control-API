import { UserRepository } from "../repository/UserRepository.js";

import { UpdateUserSchemaType } from "../schemas/update-user.schema.js";
import { DeleteUserSchemaType } from "../schemas/delete-user.schema.js";

import { UserResponse } from "@/utils/UserResponse.js";
import { Password } from "@/utils/Password.js";

export class UserService {
    constructor(private readonly userRepository = new UserRepository()) { }

    private findUser = async (userId: string) => {
        const user = await this.userRepository.findById(userId)
        if (!user) throw new Error("Usuário não encontrado")
        return user
    }

    getUser = async (userId: string) => {
        const existingUser =
            await this.findUser(userId)

        return UserResponse.from(existingUser)
    }

    updateUser = async (userId: string, data: UpdateUserSchemaType) => {
        const existingUser =
            await this.findUser(userId)

        const updatedUser =
            await this.userRepository.update(userId, data)

        return UserResponse.from(updatedUser)
    }

    deleteUser = async (userId: string, data: DeleteUserSchemaType) => {
        const existingUser =
            await this.findUser(userId)

        if (data.password !== data.confirmPassword)
            throw new Error("Senhas não coincidem")

        if (!(await Password.compare(data.password, existingUser.password)))
            throw new Error("Senha incorreta")

        await this.userRepository.deleteById(existingUser.id)
    }

}