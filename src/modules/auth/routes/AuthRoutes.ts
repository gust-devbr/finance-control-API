import { Router } from "express";
import { AuthController } from "../controller/AuthController.js";
import { AuthMiddleware } from "@/middlewares/AuthMiddleware.js";

const authController = new AuthController()

const router: Router = Router()

router.post("/register", authController.registerPostHandler)
router.post("/login", authController.loginPostHandler)
router.post("/refresh", authController.refreshPostHandler)
router.post("/logout", AuthMiddleware, authController.logoutPostHandler)

export default router