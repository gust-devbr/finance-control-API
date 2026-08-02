import { Response as Res, Request as Req } from "express";
import { Response } from "@/utils/Response.js";

import { UserService } from "../service/UserService.js";

import { updateUserSchema } from "../schemas/update-user.schema.js";
import { deleteUserSchema } from "../schemas/delete-user.schema.js";

export class UserController {
    constructor(private readonly userService = new UserService()) { }

    getHandler = async (req: Req, res: Res) => {
        try {
            const user =
                await this.userService.getUser(req.user.id)

            return Response.success(res, { user })
        } catch (error) {
            return Response.error(res, (error as Error).message)
        }
    }

    putHandler = async (req: Req, res: Res) => {
        try {
            const body = updateUserSchema.parse(req.body)

            const user = await this.userService.updateUser(req.user.id, body)

            return Response.success(res, { user }, "Dados atualizados")
        } catch (error) {
            return Response.error(res, (error as Error).message)
        }
    }

    deleteHandler = async (req: Req, res: Res) => {
        try {
            const body = deleteUserSchema.parse(req.body)

            await this.userService.deleteUser(req.user.id, body)

            return Response.success(res, null, "Dados deletados")
        } catch (error) {
            return Response.error(res, (error as Error).message)
        }
    }

}