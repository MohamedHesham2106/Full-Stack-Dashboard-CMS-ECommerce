import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Color } from '@prisma/client';
import { ColorService } from '@/services/color.service';

export class ColorController {
  public colors = Container.get(ColorService);

  public getColorById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const colorId = req.params.id;
      const color = await this.colors.getColorById(colorId);
      res.status(201).json({ data: color, message: 'color retrieved' });
    } catch (error) {
      next(error);
    }
  };

  public getColors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const storeId = String(req.query.storeId);
      const colors: Color[] = await this.colors.getColors(storeId);
      res.status(201).json({ data: colors, message: 'colors retrieved' });
    } catch (error) {
      next(error);
    }
  };
  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const colorData: Color = req.body;
      const userId = String(req.query.userId);
      const newcolor: Color = await this.colors.create(colorData, userId);
      res.status(201).json({ data: newcolor, message: 'color created' });
    } catch (error) {
      next(error);
    }
  };
  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const colorId = req.params.id;
      const colorData: Color = req.body;
      const userId = String(req.query.userId);
      const storeId = String(req.query.storeId);
      const updatedcolor: Color[] = await this.colors.update(colorData, colorId, storeId, userId);
      res.status(201).json({ data: updatedcolor, message: 'color updated' });
    } catch (error) {
      next(error);
    }
  };
  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const colorId = req.params.id;
      const userId = String(req.query.userId);
      const storeId = String(req.query.storeId);
      const newcolors: Color[] = await this.colors.delete(colorId, storeId, userId);
      res.status(201).json({ data: newcolors, message: 'color deleted' });
    } catch (error) {
      next(error);
    }
  };
}
