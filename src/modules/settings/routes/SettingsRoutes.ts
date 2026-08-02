import { Router } from "express";

import { SettingsController } from "../controller/SettingsController.js";
import { AuthMiddleware } from "@/middlewares/AuthMiddleware.js";

const settingsController = new SettingsController()

const router: Router = Router()

router.use(AuthMiddleware)
router.get("/", settingsController.getHandler)
router.put("/", settingsController.putHandler)
router.patch("/", settingsController.patchHandler)

export default router