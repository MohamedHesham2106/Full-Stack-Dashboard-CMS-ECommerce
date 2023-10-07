import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Category } from '@prisma/client';
import { CategoryService } from '@/services/category.service';

export class CategoryController {
  public categories = Container.get(CategoryService);

  public getCategoryById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryId = req.params.id;
      const category = await this.categories.getCategoryById(categoryId);
      res.status(201).json({ data: category, message: 'category retrieved' });
    } catch (error) {
      next(error);
    }
  };

  public getCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const storeId = String(req.query.storeId);
      const categories: Category[] = await this.categories.getCategories(storeId);
      res.status(201).json({ data: categories, message: 'categories retrieved' });
    } catch (error) {
      next(error);
    }
  };
  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryData: Category = req.body;
      const userId = String(req.query.userId);
      const newCategory: Category = await this.categories.create(categoryData, userId);
      res.status(201).json({ data: newCategory, message: 'category created' });
    } catch (error) {
      next(error);
    }
  };
  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryId = req.params.id;
      const categoryData: Category = req.body;
      const userId = String(req.query.userId);
      const storeId = String(req.query.storeId);
      const updatedCategory: Category[] = await this.categories.update(categoryData, categoryId, storeId, userId);
      res.status(201).json({ data: updatedCategory, message: 'category updated' });
    } catch (error) {
      next(error);
    }
  };
  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryId = req.params.id;
      const userId = String(req.query.userId);
      const storeId = String(req.query.storeId);
      const newCategories: Category[] = await this.categories.delete(categoryId, storeId, userId);
      res.status(201).json({ data: newCategories, message: 'category deleted' });
    } catch (error) {
      next(error);
    }
  };
}
