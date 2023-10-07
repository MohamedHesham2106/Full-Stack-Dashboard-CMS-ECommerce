import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import { BillboardController } from '@/controllers/billboard.controller';
export class BillboardRoute implements Routes {
  public path = '/billboard';
  public router = Router();
  public billboard = new BillboardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.billboard.getBillboards);
    this.router.get(`${this.path}/:id`, this.billboard.getBillboardById);
    this.router.post(`${this.path}`, this.billboard.create);
    this.router.patch(`${this.path}/:id`, this.billboard.update);
    this.router.delete(`${this.path}/:id`, this.billboard.delete);
  }
}
