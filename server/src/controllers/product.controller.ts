import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Image, Product } from '@prisma/client';
import { ProductService } from '@/services/product.service';
export class ProductController {
  public product = Container.get(ProductService);

  public getProductById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productId = req.params.id;

      const product = await this.product.getProductById(productId);
      res.status(201).json({ data: product, message: 'product retrieved' });
    } catch (error) {
      next(error);
    }
  };
  public getProducts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categoryId = req.query.categoryId !== undefined ? String(req.query.categoryId) : undefined;
      const colorId = req.query.colorId !== undefined ? String(req.query.colorId) : undefined;
      const sizeId = req.query.sizeId !== undefined ? String(req.query.sizeId) : undefined;
      const isFeatured = req.query.isFeatured !== undefined ? String(req.query.isFeatured) : undefined;
      const storeId = String(req.query.storeId);
      const userId = String(req.query.userId);
      const products: Product[] = await this.product.getProducts(storeId, userId, categoryId, colorId, sizeId, isFeatured);
      res.status(201).json({ data: products, message: 'products retrieved' });
    } catch (error) {
      next(error);
    }
  };

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productData: Product & { images: Image[] } = req.body;
      const userId = String(req.query.userId);
      const newProduct: Product = await this.product.create(productData, userId);
      res.status(201).json({ data: newProduct, message: 'product created' });
    } catch (error) {
      next(error);
    }
  };
  public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productId = req.params.id;
      const productData: Product & { images: Image[] } = req.body;
      const userId = String(req.query.userId);
      const storeId = String(req.query.storeId);
      const updatedProducts: Product[] = await this.product.update(productData, productId, storeId, userId);
      res.status(201).json({ data: updatedProducts, message: 'product updated' });
    } catch (error) {
      next(error);
    }
  };
  public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const productId = req.params.id;
      const userId = String(req.query.userId);
      const storeId = String(req.query.storeId);
      const newProducts: Product[] = await this.product.delete(productId, storeId, userId);
      res.status(201).json({ data: newProducts, message: 'product deleted' });
    } catch (error) {
      next(error);
    }
  };
}
