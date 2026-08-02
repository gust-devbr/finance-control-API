import { prisma } from "@/lib/prisma.js";

import type { CreateUserSchemaType } from "../schemas/create-user.schema.js";
import type { UpdateUserSchemaType } from "../schemas/update-user.schema.js";

export class UserRepository {

    findById = async (id: string) => {
        return await prisma.user.findFirst({ where: { id } })
    }

    findByEmail = async (email: string) => {
        return await prisma.user.findUnique({ where: { email } })
    }

    create = async (data: CreateUserSchemaType) => {
        return await prisma.user.create({ data })
    }

    update = async (id: string, data: UpdateUserSchemaType) => {
        return await prisma.user.update({
            where: { id },
            data: {
                ...(data.name && { name: data.name }),
                ...(data.email && { email: data.email }),
            }
        })
    }

    async deleteById(id: string) {
        await prisma.user.delete({ where: { id } })
    }

}