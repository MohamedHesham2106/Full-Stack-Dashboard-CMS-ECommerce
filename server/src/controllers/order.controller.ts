import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Order } from '@prisma/client';
import { GraphData, OrderService } from '@/services/order.service';
export class OrderController {
  public order = Container.get(OrderService);

  public getOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const storeId = String(req.query.storeId);
      const paidOrders = Boolean(req.query.paidOrders);
      const count = Boolean(req.query.count);
      const graph = Boolean(req.query.graph);
      const orders: Order[] | number | GraphData[] = await this.order.getOrders(storeId, paidOrders, count, graph);
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
