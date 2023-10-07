import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import { CategoryController } from '@/controllers/category.controller';
export class CategoryRoute implements Routes {
  public path = '/categories';
  public router = Router();
  public categories = new CategoryController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.categories.getCategories);
    this.router.get(`${this.path}/:id`, this.categories.getCategoryById);
    this.router.post(`${this.path}`, this.categories.create);
    this.router.patch(`${this.path}/:id`, this.categories.update);
    this.router.delete(`${this.path}/:id`, this.categories.delete);
  }
}
