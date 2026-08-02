import { Response as Res, Request as Req } from "express";
import { Response } from "@/utils/Response.js";

import { AuthService } from "../services/AuthService.js";

import { createUserSchema } from "@/modules/user/schemas/create-user.schema.js";
import { loginUserSchema } from "../schemas/user-login.schema.js";

export class AuthController {
    constructor(private readonly authService = new AuthService()) { }

    registerPostHandler = async (req: Req, res: Res) => {
        try {
            const body = createUserSchema.parse(req.body)

            const createdData =
                await this.authService.register(body)

            return Response.success(res, createdData, "Cadastro realizado", 201)
        } catch (error) {
            return Response.error(res, (error as Error).message)
        }
    }

    loginPostHandler = async (req: Req, res: Res) => {
        try {
            const body = loginUserSchema.parse(req.body)

            const createdData =
                await this.authService.login(body)

            return Response.success(res, createdData, "Login realizado")
        } catch (error) {
            return Response.error(res, (error as Error).message)
        }
    }

    logoutPostHandler = async (req: Req, res: Res) => {
        try {
            const { refreshToken } = req.body

            await this.authService.logout(req.user.id, refreshToken)

            return Response.success(res, null, "Logout realizado")
        } catch (error) {
            return Response.error(res, (error as Error).message)
        }
    }

    refreshPostHandler = async (req: Req, res: Res) => {
        try {
            const { refreshToken } = req.body

            if (!refreshToken)
                return Response.error(res, "Não autorizado", 401)

            const accessToken =
                await this.authService.refresh(refreshToken)

            return Response.success(res, { accessToken }, "Token de acesso criado", 201)
        } catch (error) {
            return Response.error(res, (error as Error).message)
        }
    }

}