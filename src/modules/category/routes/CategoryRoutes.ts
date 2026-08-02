import { Router } from "express";

import { AuthMiddleware } from "@/middlewares/AuthMiddleware.js";
import { CategoryController } from "../controller/CategoryController.js";

const categoryController = new CategoryController()

const router: Router = Router()

router.use(AuthMiddleware)
router.get("/", categoryController.getHandler)
router.post("/", categoryController.postHandler)
router.put("/:id", categoryController.putHandler)
router.delete("/:id", categoryController.deleteHandler)

export default router