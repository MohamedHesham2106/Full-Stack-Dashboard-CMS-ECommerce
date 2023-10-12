import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import { OrderController } from '@/controllers/order.controller';
export class OrderRoute implements Routes {
  public path = '/orders';
  public router = Router();
  public order = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.order.getOrders);
    this.router.post(`${this.path}/checkout`, this.order.checkout);
  }
}
