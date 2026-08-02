import { Response as Res } from "express"

export class Response {

    static success(
        res: Res,
        data: unknown | null = null,
        message: string = "Sucesso",
        status: number = 200
    ) {
        return res.status(status).json({
            success: true,
            message,
            data
        })
    }

    static error(
        res: Res,
        message = "Erro interno",
        status = 500,
        details?: Record<string, unknown>
    ) {
        return res.status(status).json({
            success: false,
            message,
            ...(details && { details })
        });
    }
}
