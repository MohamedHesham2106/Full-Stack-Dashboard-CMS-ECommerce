import { PrismaClient, Billboard } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';
@Service()
export class BillboardService {
  public billboard = new PrismaClient().billboard;
  public store = new PrismaClient().store;

  public async getBillboardById(billboardId: string): Promise<Billboard> {
    if (!billboardId) throw new HttpException(400, 'Billboard id is required.');
    const billboard = await this.billboard.findUnique({
      where: {
        id: billboardId,
      },
    });
    return billboard;
  }

  public async getBillboards(storeId: string): Promise<Billboard[]> {
    if (!storeId) throw new HttpException(400, 'Store id is required.');
    const billboards = await this.billboard.findMany({
      where: {
        storeId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return billboards;
  }
  public async create(billboardData: Billboard, userId: string): Promise<Billboard> {
    if (!userId) throw new HttpException(401, 'Unauthenticated.');

    const storeId = String(billboardData.storeId);

    if (!storeId) throw new HttpException(400, 'store id is required.');

    const { imageUrl, label } = billboardData;
    if (!label) throw new HttpException(400, 'label is required.');

    if (!imageUrl) throw new HttpException(400, 'image Url is required.');

    const storeByUserId = await this.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });
    if (!storeByUserId) throw new HttpException(403, 'Unauthorized.');

    const billboard = await this.billboard.create({
      data: {
        label,
        imageUrl,
        storeId,
      },
    });
    return billboard;
  }
  public async update(billboardData: Billboard, billboardId: string, storeId: string, userId: string): Promise<Billboard[]> {
    if (!userId) throw new HttpException(401, 'Unauthenticated.');

    const { label, imageUrl } = billboardData;

    if (!storeId) throw new HttpException(400, 'storeId is required.');
    if (!label) throw new HttpException(400, 'label is required.');
    if (!imageUrl) throw new HttpException(400, 'image Url is required.');
    if (!billboardId) throw new HttpException(400, 'billboardId is required.');

    const storeByUserId = await this.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });
    if (!storeByUserId) throw new HttpException(403, 'Unauthorized.');

    await this.billboard.updateMany({
      where: {
        id: billboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });
    const updatedBillboard = await this.billboard.findMany({
      where: {
        id: storeId,
        storeId: storeId,
      },
    });
    return updatedBillboard;
  }
  public async delete(billboardId: string, storeId: string, userId: string): Promise<Billboard[]> {
    if (!userId) throw new HttpException(401, 'Unauthenticated.');
    if (!storeId) throw new HttpException(400, 'Store id is required.');
    if (!billboardId) throw new HttpException(400, 'Billboard id is required.');
    const storeByUserId = await this.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });
    if (!storeByUserId) throw new HttpException(403, 'Unauthorized.');
    await this.billboard.deleteMany({
      where: {
        id: billboardId,
      },
    });
    const billboards = await this.billboard.findMany({
      where: {
        id: storeId,
        storeId,
      },
    });
    return billboards;
  }
}
