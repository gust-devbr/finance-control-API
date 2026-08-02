import {
    Request as Req,
    Response as Res,
    NextFunction as Next
} from "express"

import { Response } from "@/utils/Response.js"
import { Jwt } from "@/utils/Jwt.js"

export function AuthMiddleware(req: Req, res: Res, next: Next) {
    const token = req.headers["authorization"]?.split(" ")[1]

    if (!token) {
        return Response.error(res, "Não autorizado", 401)
    }

    try {
        const payload = Jwt.verifyAccessToken(token)
        req.user = payload

        next()
    } catch (error) {
        return Response.error(res, "Token inválido ou expirado", 401)
    }
}