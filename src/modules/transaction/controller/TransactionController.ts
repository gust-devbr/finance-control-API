import { Request as Req, Response as Res } from "express";
import { Response } from "@/utils/Response.js";

import { TransactionService } from "../service/TransactionService.js";

import { createTransactionSchema } from "../schemas/create-transaction.schema.js";
import { updateTransactionSchema } from "../schemas/update-transaction.schema.js";

export class TransactionController {
    constructor(private readonly transactionService = new TransactionService()) { }

    getHandler = async (req: Req, res: Res) => {
        try {
            const { transactions, summary } =
                await this.transactionService.getAll(req.user.id)

            return Response.success(res, { summary, transactions })
        } catch (error) {
            return Response.error(res, (error as Error).message)
        }
    }

    postHandler = async (req: Req, res: Res) => {
        try {
            const body = createTransactionSchema.parse(req.body)

            const transaction =
                await this.transactionService.create(req.user.id, body)

            return Response.success(res, { transaction }, "Transação criada", 201)
        } catch (error) {
            return Response.error(res, (error as Error).message)
        }
    }

    putHandler = async (req: Req, res: Res) => {
        try {
            if (!req.params.id)
                return Response.error(res, "ID não fornecido", 400)

            const body = updateTransactionSchema.parse(req.body)

            const transaction = await this.transactionService.update(
                req.params.id as string,
                body
            )

            return Response.success(res, { transaction }, "Transação editada")
        } catch (error) {
            return Response.error(res, (error as Error).message)
        }
    }

    deleteHandler = async (req: Req, res: Res) => {
        try {
            if (!req.params.id)
                return Response.error(res, "ID não fornecido", 400)

            await this.transactionService.delete(req.params.id as string)

            return Response.success(res, null, "Transação excluída")
        } catch (error) {
            return Response.error(res, (error as Error).message)
        }
    }

}