import { prisma } from "@/lib/prisma.js";

export class RefreshTokenRepository {

    createToken = async (userId: string, token: string) => {
        return await prisma.refreshToken.upsert({
            where: { userId },
            update: { token },
            create: { userId, token }
        })
    }

    findToken = async (token: string) => {
        return await prisma.refreshToken.findUnique({ where: { token } })
    }

    deleteToken = async (userId: string, token: string) => {
        await prisma.refreshToken.deleteMany({ where: { userId, token } })
    }
}