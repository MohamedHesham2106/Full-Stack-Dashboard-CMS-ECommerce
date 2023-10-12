import { PrismaClient, Category } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';
@Service()
export class CategoryService {
  public categories = new PrismaClient().category;
  public store = new PrismaClient().store;

  public async getCategoryById(categoryId: string): Promise<Category> {
    if (!categoryId) throw new HttpException(400, 'Category id is required.');
    const category = await this.categories.findUnique({
      where: {
        id: categoryId,
      },
      include: {
        billboard: true,
      },
    });
    return category;
  }
  public async getCategories(storeId: string): Promise<Category[]> {
    if (!storeId) throw new HttpException(400, 'Store id is required.');
    const categories = await this.categories.findMany({
      where: {
        storeId,
      },
      include: {
        billboard: true,
        store: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return categories;
  }
  public async create(categoryData: Category, userId: string): Promise<Category> {
    if (!userId) throw new HttpException(401, 'Unauthenticated.');

    const storeId = String(categoryData.storeId);

    if (!storeId) throw new HttpException(400, 'store id is required.');

    const { name, billboardId } = categoryData;
    if (!name) throw new HttpException(400, 'name is required.');

    if (!billboardId) throw new HttpException(400, 'billboardId is required.');

    const storeByUserId = await this.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });
    if (!storeByUserId) throw new HttpException(403, 'Unauthorized.');

    const category = await this.categories.create({
      data: {
        name,
        billboardId,
        storeId,
      },
    });
    return category;
  }
  public async update(categoryData: Category, categoryId: string, storeId: string, userId: string): Promise<Category[]> {
    if (!userId) throw new HttpException(401, 'Unauthenticated.');

    const { name, billboardId } = categoryData;

    if (!storeId) throw new HttpException(400, 'storeId is required.');
    if (!name) throw new HttpException(400, 'name is required.');
    if (!billboardId) throw new HttpException(400, 'billboardId is required.');

    const storeByUserId = await this.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });
    if (!storeByUserId) throw new HttpException(403, 'Unauthorized.');

    await this.categories.updateMany({
      where: {
        id: categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });
    const updatedCategories = await this.categories.findMany({
      where: {
        id: categoryId,
        storeId: storeId,
      },
    });
    return updatedCategories;
  }
  public async delete(categoryId: string, storeId: string, userId: string): Promise<Category[]> {
    if (!userId) throw new HttpException(401, 'Unauthenticated.');
    if (!storeId) throw new HttpException(400, 'Store id is required.');
    const storeByUserId = await this.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });
    if (!storeByUserId) throw new HttpException(403, 'Unauthorized.');
    await this.categories.deleteMany({
      where: {
        id: categoryId,
      },
    });
    const categories = await this.categories.findMany({
      where: {
        storeId,
      },
    });
    return categories;
  }
}
