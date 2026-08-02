import { Request as Req, Response as Res } from "express";
import { Response } from "@/utils/Response.js";

import { SettingsService } from "../services/SettingsService.js";

import { updateSettingsSchema } from "../schemas/update-settings.schema.js";

export class SettingsController {
    constructor(private readonly settingsService = new SettingsService()) { }

    getHandler = async (req: Req, res: Res) => {
        try {
            const settings =
                await this.settingsService.getAll(req.user.id)

            return Response.success(res, { settings })
        } catch (error) {
            return Response.error(res, (error as Error).message)
        }
    }

    putHandler = async (req: Req, res: Res) => {
        try {
            const body = updateSettingsSchema.parse(req.body)

            const settings =
                await this.settingsService.updateSettings(req.user.id, body)

            return Response.success(res, { settings }, "Configurações atualizadas")
        } catch (error) {
            return Response.error(res, (error as Error).message)
        }
    }

    patchHandler = async (req: Req, res: Res) => {
        try {
            const settings =
                await this.settingsService.resetSettings(req.user.id)

            return Response.success(res, { settings }, "Configurações resetadas")
        } catch (error) {
            return Response.error(res, (error as Error).message)
        }
    }

}