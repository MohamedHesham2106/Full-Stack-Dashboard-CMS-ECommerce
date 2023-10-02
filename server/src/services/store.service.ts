import { PrismaClient, Store } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';

@Service()
export class StoreService {
  public store = new PrismaClient().store;
  public async createStore(storeData: Store): Promise<Store> {
    const userId = String(storeData.userId);
    if (!userId) throw new HttpException(401, 'Unauthorized');
    const { name } = storeData;
    if (!name) throw new HttpException(400, 'Missing store name');
    const store = await this.store.create({
      data: {
        name,
        userId,
      },
    });
    return store;
  }
}
