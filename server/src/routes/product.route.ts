import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import { ProductController } from '@/controllers/product.controller';
export class ProductRoute implements Routes {
  public path = '/products';
  public router = Router();
  public product = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.product.getProducts);
    this.router.get(`${this.path}/:id`, this.product.getProductById);
    this.router.post(`${this.path}`, this.product.create);
    this.router.patch(`${this.path}/:id`, this.product.update);
    this.router.delete(`${this.path}/:id`, this.product.delete);
  }
}
