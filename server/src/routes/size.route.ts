import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import { SizeController } from '@/controllers/size.controller';
export class SizeRoute implements Routes {
  public path = '/sizes';
  public router = Router();
  public sizes = new SizeController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.sizes.getSizes);
    this.router.get(`${this.path}/:id`, this.sizes.getSizeById);
    this.router.post(`${this.path}`, this.sizes.create);
    this.router.patch(`${this.path}/:id`, this.sizes.update);
    this.router.delete(`${this.path}/:id`, this.sizes.delete);
  }
}
