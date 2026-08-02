import { Router } from "express";
import { AuthMiddleware } from "@/middlewares/AuthMiddleware.js";
import { UserController } from "../controller/UserController.js";

const userController = new UserController()

const router: Router = Router()

router.use(AuthMiddleware)
router.get("/", userController.getHandler)
router.put("/", userController.putHandler)
router.delete("/", userController.deleteHandler)

export default router