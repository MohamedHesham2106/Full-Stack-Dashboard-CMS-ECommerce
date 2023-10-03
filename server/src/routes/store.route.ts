import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Router } from 'express';
import { StoreController } from '@/controllers/store.controller';
import { CreateStoreDto } from '@/dtos/store.dto';

export class StoreRoute implements Routes {
  public path = '/store';
  public router = Router();
  public store = new StoreController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, ValidationMiddleware(CreateStoreDto), this.store.createStore);
    this.router.get(`${this.path}/:id`, this.store.getStoreById);
    this.router.get(`${this.path}`, this.store.getUserStores);
  }
}
