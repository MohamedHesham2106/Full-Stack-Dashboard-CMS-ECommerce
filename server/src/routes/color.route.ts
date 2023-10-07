import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import { ColorController } from '@/controllers/color.controller';
export class ColorRoute implements Routes {
  public path = '/colors';
  public router = Router();
  public colors = new ColorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.colors.getColors);
    this.router.get(`${this.path}/:id`, this.colors.getColorById);
    this.router.post(`${this.path}`, this.colors.create);
    this.router.patch(`${this.path}/:id`, this.colors.update);
    this.router.delete(`${this.path}/:id`, this.colors.delete);
  }
}
