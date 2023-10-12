import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Order } from '@prisma/client';
import { OrderService } from '@/services/order.service';
export class OrderController {
  public order = Container.get(OrderService);

  public getOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const storeId = String(req.query.storeId);
      const orders: Order[] = await this.order.getOrders(storeId);
      res.status(201).json({ data: orders, message: 'orders retrieved' });
    } catch (error) {
      next(error);
    }
  };
  public checkout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const storeId = String(req.body.storeId);
      const productIds = req.body.productIds;
      const session = await this.order.checkout(storeId, productIds);
      res.status(201).json({ data: { url: session }, message: 'order created' });
    } catch (error) {
      next(error);
    }
  };
}
