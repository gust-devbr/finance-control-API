import { Router } from "express";

import { AuthMiddleware } from "@/middlewares/AuthMiddleware.js";
import { TransactionController } from "../controller/TransactionController.js";

const transactionController = new TransactionController()

const router: Router = Router()

router.use(AuthMiddleware)
router.get("/", transactionController.getHandler)
router.post("/", transactionController.postHandler)
router.put("/:id", transactionController.putHandler)
router.delete("/:id", transactionController.deleteHandler)

export default router