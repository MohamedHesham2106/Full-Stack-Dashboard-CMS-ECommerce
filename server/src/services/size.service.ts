import { PrismaClient, Size } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';
@Service()
export class SizeService {
  public sizes = new PrismaClient().size;
  public store = new PrismaClient().store;

  public async getSizeById(sizeId: string): Promise<Size> {
    if (!sizeId) throw new HttpException(400, 'size id is required.');
    const size = await this.sizes.findUnique({
      where: {
        id: sizeId,
      },
    });
    return size;
  }
  public async getSizes(storeId: string): Promise<Size[]> {
    if (!storeId) throw new HttpException(400, 'Store id is required.');
    const categories = await this.sizes.findMany({
      where: {
        storeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return categories;
  }
  public async create(sizeData: Size, userId: string): Promise<Size> {
    if (!userId) throw new HttpException(401, 'Unauthenticated.');

    const storeId = String(sizeData.storeId);

    if (!storeId) throw new HttpException(400, 'store id is required.');

    const { name, value } = sizeData;
    if (!name) throw new HttpException(400, 'name is required.');

    if (!value) throw new HttpException(400, 'value is required.');

    const storeByUserId = await this.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });
    if (!storeByUserId) throw new HttpException(403, 'Unauthorized.');

    const size = await this.sizes.create({
      data: {
        name,
        value,
        storeId,
      },
    });
    return size;
  }
  public async update(sizeData: Size, sizeId: string, storeId: string, userId: string): Promise<Size[]> {
    if (!userId) throw new HttpException(401, 'Unauthenticated.');

    const { name, value } = sizeData;

    if (!storeId) throw new HttpException(400, 'storeId is required.');
    if (!name) throw new HttpException(400, 'name is required.');
    if (!value) throw new HttpException(400, 'value is required.');

    const storeByUserId = await this.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });
    if (!storeByUserId) throw new HttpException(403, 'Unauthorized.');

    await this.sizes.updateMany({
      where: {
        id: sizeId,
      },
      data: {
        name,
        value,
      },
    });
    const updatedSizes = await this.sizes.findMany({
      where: {
        id: sizeId,
        storeId: storeId,
      },
    });
    return updatedSizes;
  }
  public async delete(sizeId: string, storeId: string, userId: string): Promise<Size[]> {
    if (!userId) throw new HttpException(401, 'Unauthenticated.');
    if (!storeId) throw new HttpException(400, 'Store id is required.');
    const storeByUserId = await this.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });
    if (!storeByUserId) throw new HttpException(403, 'Unauthorized.');
    await this.sizes.deleteMany({
      where: {
        id: sizeId,
      },
    });
    const sizes = await this.sizes.findMany({
      where: {
        storeId,
      },
    });
    return sizes;
  }
}
