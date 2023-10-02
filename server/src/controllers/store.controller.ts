import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Store } from '@prisma/client';
import { StoreService } from '@/services/store.service';

export class StoreController {
  public store = Container.get(StoreService);
  public createStore = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const storeData: Store = req.body;
      const newStore: Store = await this.store.createStore(storeData);
      res.status(201).json({ data: newStore, message: 'store created' });
    } catch (error) {
      next(error);
    }
  };
}
