import { Image, PrismaClient, Product } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';
@Service()
export class ProductService {
  public product = new PrismaClient().product;
  public store = new PrismaClient().store;

  public async getProductById(productId: string): Promise<Product> {
    if (!productId) throw new HttpException(400, 'Product id is required.');
    const product = await this.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
        category: true,
        size: true,
        color: true,
      },
    });
    return product;
  }

  public async getProducts(
    storeId: string,
    userId: string,
    categoryId?: string,
    colorId?: string,
    sizeId?: string,
    isFeatured?: string,
    count = false,
  ): Promise<Product[] | number> {
    if (!storeId) throw new HttpException(400, 'Store id is required.');
    if (count) {
      const stockCount = await this.product.count({
        where: {
          storeId,
          isArchived: false,
        },
      });
      return stockCount;
    }
    const whereClause: {
      storeId: string;
      categoryId?: string;
      colorId?: string;
      sizeId?: string;
      isFeatured?: boolean;
      isArchived: boolean;
    } = {
      storeId,
      isArchived: false,
    };

    if (categoryId) whereClause.categoryId = categoryId;
    if (colorId) whereClause.colorId = colorId;
    if (sizeId) whereClause.sizeId = sizeId;
    if (isFeatured) whereClause.isFeatured = true;

    const storeByUserId = await this.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return this.product.findMany({
        where: whereClause,
        include: {
          category: true,
          size: true,
          color: true,
          images: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } else {
      return this.product.findMany({
        where: {
          storeId,
        },
        include: {
          category: true,
          size: true,
          color: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    }
  }

  public async create(productData: Product & { images: Image[] }, userId: string): Promise<Product> {
    if (!userId) throw new HttpException(401, 'Unauthenticated.');

    const storeId = String(productData.storeId);

    if (!storeId) throw new HttpException(400, 'store id is required.');

    const { name, price, colorId, categoryId, sizeId, isArchived, isFeatured, images } = productData;

    if (!name) throw new HttpException(400, 'name is required.');

    if (!price) throw new HttpException(400, 'price is required.');

    if (!categoryId) throw new HttpException(400, 'category id is required.');
    if (!sizeId) throw new HttpException(400, 'size id is required.');
    if (!colorId) throw new HttpException(400, 'color id is required.');

    if (!images || !images.length) throw new HttpException(400, 'images is required.');

    const storeByUserId = await this.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });
    if (!storeByUserId) throw new HttpException(403, 'Unauthorized.');

    const product = await this.product.create({
      data: {
        name,
        price,
        categoryId,
        isArchived,
        isFeatured,
        sizeId,
        colorId,
        storeId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });
    return product;
  }
  public async update(
    productData: Product & {
      images: Image[];
    },
    productId: string,
    storeId: string,
    userId: string,
  ): Promise<Product[]> {
    if (!userId) throw new HttpException(401, 'Unauthenticated.');

    const { name, price, colorId, categoryId, sizeId, isArchived, isFeatured, images } = productData;

    if (!productId) throw new HttpException(400, 'productId is required.');
    if (!storeId) throw new HttpException(400, 'storeId is required.');

    if (!name) throw new HttpException(400, 'name is required.');

    if (!price) throw new HttpException(400, 'price is required.');

    if (!categoryId) throw new HttpException(400, 'category id is required.');
    if (!sizeId) throw new HttpException(400, 'size id is required.');
    if (!colorId) throw new HttpException(400, 'color id is required.');

    if (!images || !images.length) throw new HttpException(400, 'images is required.');

    const storeByUserId = await this.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });
    if (!storeByUserId) throw new HttpException(403, 'Unauthorized.');

    await this.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        categoryId,
        colorId,
        price,
        sizeId,
        storeId,
        isArchived,
        isFeatured,
        images: {
          deleteMany: {},
        },
      },
    });
    await this.product.update({
      where: {
        id: productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    const updatedProduct = await this.product.findMany({
      where: {
        id: storeId,
        storeId: storeId,
      },
    });
    return updatedProduct;
  }
  public async delete(productId: string, storeId: string, userId: string): Promise<Product[]> {
    if (!userId) throw new HttpException(401, 'Unauthenticated.');
    if (!storeId) throw new HttpException(400, 'Store id is required.');
    if (!productId) throw new HttpException(400, 'Product id is required.');
    const storeByUserId = await this.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });
    if (!storeByUserId) throw new HttpException(403, 'Unauthorized.');
    await this.product.deleteMany({
      where: {
        id: productId,
      },
    });
    const products = await this.product.findMany({
      where: {
        storeId,
      },
    });
    return products;
  }
}
