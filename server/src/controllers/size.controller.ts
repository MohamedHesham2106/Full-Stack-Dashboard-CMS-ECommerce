import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Size } from '@prisma/client';
import { SizeService } from '@/services/size.service';

export class SizeController {
  public sizes = Container.get(SizeService);

  public getSizeById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sizeId = req.params.id;
      const size = await this.sizes.getSizeById(sizeId);
      res.status(201).json({ data: size, message: 'size retrieved' });
    } catch (error) {
      next(error);
    }
  };

  public getSizes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const storeId = String(req.query.storeId);
      const sizes: Size[] = await this.sizes.getSizes(storeId);
      res.status(201).json({ data: sizes, message: 'size retrieved' });
    } catch (error) {
      next(error);
    }
  };
  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sizeData: Size = req.body;
      const userId = String(req.query.userId);
      const newSize: Size = await this.sizes.create(sizeData, userId);
      res.status(201).json({ data: newSize, message: 'size created' });
    } catch (error) {
      next(error);
    }
  };
  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sizeId = req.params.id;
      const sizeData: Size = req.body;
      const userId = String(req.query.userId);
      const storeId = String(req.query.storeId);
      const updatedSize: Size[] = await this.sizes.update(sizeData, sizeId, storeId, userId);
      res.status(201).json({ data: updatedSize, message: 'size updated' });
    } catch (error) {
      next(error);
    }
  };
  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const sizeId = req.params.id;
      const userId = String(req.query.userId);
      const storeId = String(req.query.storeId);
      const newSizes: Size[] = await this.sizes.delete(sizeId, storeId, userId);
      res.status(201).json({ data: newSizes, message: 'size deleted' });
    } catch (error) {
      next(error);
    }
  };
}
