import { UserRepository } from "@/modules/user/repository/UserRepository.js";
import { CategoryRepository } from "../repository/category-repository.js";

import type { CreateCategorySchemaType } from "../schemas/create-category.schema.js";
import type { UpdateCategorySchemaType } from "../schemas/update-category.schema.js";

export class CategoryService {
  constructor(
    private readonly categoryRepository = new CategoryRepository(),
    private readonly userRepository = new UserRepository(),
  ) {}

  getAll = async (userId: string) => {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("Usuário não encontrado");

    return await this.categoryRepository.findAllByUserId(user.id);
  };

  createCategory = async (userId: string, data: CreateCategorySchemaType) => {
    const user = await this.userRepository.findById(userId);
    if (!user) throw new Error("Usuário não encontrado");

    return await this.categoryRepository.create(user.id, data);
  };

  updateCategory = async (id: string, data: UpdateCategorySchemaType) => {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new Error("Categoria não encontrada");

    return await this.categoryRepository.update(category.id, data);
  };

  deleteCategory = async (id: string) => {
    const category = await this.categoryRepository.findById(id);
    if (!category) throw new Error("Categoria não encontrada");

    await this.categoryRepository.deleteById(category.id);
  };
}
