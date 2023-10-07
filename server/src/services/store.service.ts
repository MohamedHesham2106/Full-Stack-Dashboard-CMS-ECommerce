import { PrismaClient, Store } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';

@Service()
export class StoreService {
  public store = new PrismaClient().store;
  public async create(storeData: Store): Promise<Store> {
    const userId = String(storeData.userId);
    if (!userId) throw new HttpException(401, 'Unauthenticated');
    const { name } = storeData;
    if (!name) throw new HttpException(400, 'Store name is required.');
    const store = await this.store.create({
      data: {
        name,
        userId,
      },
    });
    return store;
  }
  public async update(store: Store, storeId: string, userId: string): Promise<Store[]> {
    if (!userId) throw new HttpException(401, 'Unauthenticated');
    const { name } = store;
    if (!name) throw new HttpException(400, 'Name is required.');
    if (!storeId) throw new HttpException(400, 'Store id is required.');
    await this.store.updateMany({
      where: {
        id: storeId,
        userId,
      },
      data: {
        name,
      },
    });
    const updatedStore = await this.store.findMany({
      where: {
        id: storeId,
        userId,
      },
    });
    return updatedStore;
  }
  public async delete(storeId: string, userId: string): Promise<Store[]> {
    if (!userId) throw new HttpException(401, 'Unauthenticated.');
    if (!storeId) throw new HttpException(400, 'Store id is required.');
    await this.store.deleteMany({
      where: {
        id: storeId,
        userId,
      },
    });
    const stores = await this.store.findMany({
      where: {
        id: storeId,
        userId,
      },
    });
    return stores;
  }
  public async findStoreById(storeId: string, userId: string): Promise<Store> {
    if (!userId) throw new HttpException(401, 'Unauthenticated');
    if (!storeId) {
      throw new HttpException(400, 'Store id is required.');
    }
    const store = await this.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });
    return store;
  }
  public async findUserStores(userId: string): Promise<Store[]> {
    const stores = await this.store.findMany({
      where: {
        userId,
      },
    });
    return stores;
  }
}
