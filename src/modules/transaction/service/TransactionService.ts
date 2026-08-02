import { UserRepository } from "@/modules/user/repository/UserRepository.js";
import { TransactionRepository } from "../repository/TransactionRepository.js";

import type { CreateTransactionSchemaType } from "../schemas/create-transaction.schema.js";
import type { UpdateTransactionSchemaType } from "../schemas/update-transaction.schema.js";

export class TransactionService {
    constructor(
        private readonly transactionRepository = new TransactionRepository(),
        private readonly userRepository = new UserRepository()
    ) { }

    private findUser = async (userId: string) => {
        const user = await this.userRepository.findById(userId)
        if (!user) throw new Error("Usuário não encontrado")
        return user
    }

    private findTransaction = async (userId: string) => {
        const transaction = await this.transactionRepository.findById(userId)
        if (!transaction) throw new Error("Transação não encontrado")
        return transaction
    }

    getAll = async (userId: string) => {
        const user = await this.findUser(userId)

        const [transactions, summary] = await Promise.all([
            await this.transactionRepository.findAllByUserId(user.id),
            await this.transactionRepository.calculateTransactions(user.id)
        ])

        return { transactions, summary }
    }

    create = async (userId: string, data: CreateTransactionSchemaType) => {
        const user = await this.findUser(userId)
        return await this.transactionRepository.create(user.id, data)
    }

    update = async (id: string, data: UpdateTransactionSchemaType) => {
        const transaction = await this.findTransaction(id)
        return await this.transactionRepository.update(transaction.id, data)
    }

    delete = async (id: string) => {
        const transaction = await this.findTransaction(id)
        await this.transactionRepository.deleteById(transaction.id)
    }

}