import { prisma } from "@/lib/prisma.js";

import type { CreateCategorySchemaType } from "../schemas/create-category.schema.js";
import type { UpdateCategorySchemaType } from "../schemas/update-category.schema.js";

export class CategoryRepository {
  findById = async (id: string) => {
    return await prisma.category.findFirst({ where: { id } });
  };

  findAllByUserId = async (userId: string) => {
    return await prisma.category.findMany({
      where: { userId },
      include: {
        _count: { select: { transaction: true } },
      },
    });
  };

  existsByNameAndColor = async (name: string, color: string) => {
    return await prisma.category.findFirst({ where: { name, color } });
  };

  deleteById = async (id: string) => {
    await prisma.category.delete({ where: { id } });
  };

  create = async (userId: string, data: CreateCategorySchemaType) => {
    return await prisma.category.create({
      data: { userId, ...data },
    });
  };

  update = async (id: string, data: UpdateCategorySchemaType) => {
    return await prisma.category.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.color && { color: data.color }),
        ...(data.icon && { icon: data.icon }),
      },
    });
  };
}
