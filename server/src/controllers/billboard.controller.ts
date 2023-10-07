import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Billboard } from '@prisma/client';
import { BillboardService } from '@/services/billboard.service';
export class BillboardController {
  public billboard = Container.get(BillboardService);

  public getBillboardById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const billboardId = req.params.id;
      const billboard = await this.billboard.getBillboardById(billboardId);
      res.status(201).json({ data: billboard, message: 'billboard retrieved' });
    } catch (error) {
      next(error);
    }
  };
  public getBillboards = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const storeId = String(req.query.storeId);
      const billboards: Billboard[] = await this.billboard.getBillboards(storeId);
      res.status(201).json({ data: billboards, message: 'billboard retrieved' });
    } catch (error) {
      next(error);
    }
  };
  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const billboardData: Billboard = req.body;
      const userId = String(req.query.userId);
      const newBillboard: Billboard = await this.billboard.create(billboardData, userId);
      res.status(201).json({ data: newBillboard, message: 'billboard created' });
    } catch (error) {
      next(error);
    }
  };
  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const billboardId = req.params.id;
      const billboardData: Billboard = req.body;
      const userId = String(req.query.userId);
      const storeId = String(req.query.storeId);
      const updatedBillboards: Billboard[] = await this.billboard.update(billboardData, billboardId, storeId, userId);
      res.status(201).json({ data: updatedBillboards, message: 'billboard updated' });
    } catch (error) {
      next(error);
    }
  };
  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const billboardId = req.params.id;
      const userId = String(req.query.userId);
      const storeId = String(req.query.storeId);
      const newBillboard: Billboard[] = await this.billboard.delete(billboardId, storeId, userId);
      res.status(201).json({ data: newBillboard, message: 'billboard deleted' });
    } catch (error) {
      next(error);
    }
  };
}
