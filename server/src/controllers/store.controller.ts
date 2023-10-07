import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Store } from '@prisma/client';
import { StoreService } from '@/services/store.service';

export class StoreController {
  public store = Container.get(StoreService);
  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const storeData: Store = req.body;
      const newStore: Store = await this.store.create(storeData);
      res.status(201).json({ data: newStore, message: 'store created' });
    } catch (error) {
      next(error);
    }
  };
  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const storeId = req.params.id;
      const store: Store = req.body;
      const userId = String(req.query.userId);
      const updatedStore: Store[] = await this.store.update(store, storeId, userId);
      res.status(201).json({ data: updatedStore, message: 'store updated' });
    } catch (error) {
      next(error);
    }
  };
  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const storeId = req.params.id;
      const userId = String(req.query.userId);
      const newStore: Store[] = await this.store.delete(storeId, userId);
      res.status(201).json({ data: newStore, message: 'store deleted' });
    } catch (error) {
      next(error);
    }
  };
  public getStoreById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const storeId = req.params.id;
      const userId = String(req.query.userId);
      const store: Store = await this.store.findStoreById(storeId, userId);
      res.status(201).json({ data: store, message: 'store retrieved' });
    } catch (error) {
      next(error);
    }
  };
  public getUserStores = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = String(req.query.userId);
      const stores: Store[] = await this.store.findUserStores(userId);
      res.status(201).json({ data: stores, message: 'user stores retrieved' });
    } catch (error) {
      next(error);
    }
  };
}
