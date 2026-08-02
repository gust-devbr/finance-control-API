import { prisma } from "@/lib/prisma.js";

import type { CreateTransactionSchemaType } from "../schemas/create-transaction.schema.js";
import type { UpdateTransactionSchemaType } from "../schemas/update-transaction.schema.js";

export class TransactionRepository {

    findById = async (id: string) => {
        return await prisma.transaction.findFirst({ where: { id } })
    }

    deleteById = async (id: string) => {
        await prisma.transaction.delete({ where: { id } })
    }

    findAllByUserId = async (userId: string) => {
        return await prisma.transaction.findMany({
            where: { userId },
            include: {
                category: {
                    select: { name: true, color: true, icon: true }
                }
            }
        })
    }

    calculateTransactions = async (userId: string) => {
        const [income, expense] = await Promise.all([
            prisma.transaction.aggregate({
                where: { userId, type: "INCOME" },
                _sum: { amount: true }
            }),
            prisma.transaction.aggregate({
                where: { userId, type: "EXPENSE", },
                _sum: { amount: true }
            }),
        ])

        return {
            income: income._sum.amount ?? 0,
            expense: expense._sum.amount ?? 0,
            balance: (income._sum.amount ?? 0) - (expense._sum.amount ?? 0)
        }
    }

    create = async (userId: string, data: CreateTransactionSchemaType) => {
        return await prisma.transaction.create({
            data: { userId, ...data }
        })
    }

    update = async (id: string, data: UpdateTransactionSchemaType) => {
        return await prisma.transaction.update({
            where: { id },
            data: {
                ...(data.type && { type: data.type }),
                ...(data.title && { title: data.title }),
                ...(data.amount && { amount: data.amount }),
                ...(data.categoryId && { categoryId: data.categoryId }),
            }
        })
    }

}