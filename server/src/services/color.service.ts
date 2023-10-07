import { Color, PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';
@Service()
export class ColorService {
  public colors = new PrismaClient().color;
  public store = new PrismaClient().store;

  public async getColorById(colorId: string): Promise<Color> {
    if (!colorId) throw new HttpException(400, 'color id is required.');
    const color = await this.colors.findUnique({
      where: {
        id: colorId,
      },
    });
    return color;
  }
  public async getColors(storeId: string): Promise<Color[]> {
    if (!storeId) throw new HttpException(400, 'Store id is required.');
    const categories = await this.colors.findMany({
      where: {
        storeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return categories;
  }
  public async create(colorData: Color, userId: string): Promise<Color> {
    if (!userId) throw new HttpException(401, 'Unauthenticated.');

    const storeId = String(colorData.storeId);

    if (!storeId) throw new HttpException(400, 'store id is required.');

    const { name, value } = colorData;
    if (!name) throw new HttpException(400, 'name is required.');

    if (!value) throw new HttpException(400, 'value is required.');

    const storeByUserId = await this.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });
    if (!storeByUserId) throw new HttpException(403, 'Unauthorized.');

    const color = await this.colors.create({
      data: {
        name,
        value,
        storeId,
      },
    });
    return color;
  }
  public async update(colorData: Color, colorId: string, storeId: string, userId: string): Promise<Color[]> {
    if (!userId) throw new HttpException(401, 'Unauthenticated.');

    const { name, value } = colorData;

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

    await this.colors.updateMany({
      where: {
        id: colorId,
      },
      data: {
        name,
        value,
      },
    });
    const updatedcolors = await this.colors.findMany({
      where: {
        id: colorId,
        storeId: storeId,
      },
    });
    return updatedcolors;
  }
  public async delete(colorId: string, storeId: string, userId: string): Promise<Color[]> {
    if (!userId) throw new HttpException(401, 'Unauthenticated.');
    if (!storeId) throw new HttpException(400, 'Store id is required.');
    const storeByUserId = await this.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });
    if (!storeByUserId) throw new HttpException(403, 'Unauthorized.');
    await this.colors.deleteMany({
      where: {
        id: colorId,
      },
    });
    const colors = await this.colors.findMany({
      where: {
        storeId,
      },
    });
    return colors;
  }
}
