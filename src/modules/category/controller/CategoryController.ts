import { Request as Req, Response as Res } from "express";
import { Response } from "@/utils/Response.js";

import { CategoryService } from "../service/CategoryService.js";

import { createCategorySchema } from "../schemas/create-category.schema.js";
import { updateCategorySchema } from "../schemas/update-category.schema.js";

export class CategoryController {
    constructor(private readonly categoryService = new CategoryService()) { }

    getHandler = async (req: Req, res: Res) => {
        try {
            const categories = await this.categoryService.getAll(req.user.id)

            return Response.success(res, { categories })
        } catch (error) {
            return Response.error(res, (error as Error).message)
        }
    }

    postHandler = async (req: Req, res: Res) => {
        try {
            const body = createCategorySchema.parse(req.body)

            const category =
                await this.categoryService.createCategory(req.user.id, body)

            return Response.success(res, { category }, "Categoria criada", 201)
        } catch (error) {
            return Response.error(res, (error as Error).message)
        }
    }

    putHandler = async (req: Req, res: Res) => {
        try {
            const body = updateCategorySchema.parse(req.body)

            if (!req.params.id)
                return Response.error(res, "ID não fornecido", 400)

            const category = await this.categoryService.updateCategory(
                req.params.id as string,
                body
            )

            return Response.success(res, { category }, "Categoria editada")
        } catch (error) {
            return Response.error(res, (error as Error).message)
        }
    }

    deleteHandler = async (req: Req, res: Res) => {
        try {
            if (!req.params.id)
                return Response.error(res, "ID não fornecido", 400)

            await this.categoryService.deleteCategory(req.params.id as string)

            return Response.success(res, null, "Categoria excluída")
        } catch (error) {
            return Response.error(res, (error as Error).message)
        }
    }

}