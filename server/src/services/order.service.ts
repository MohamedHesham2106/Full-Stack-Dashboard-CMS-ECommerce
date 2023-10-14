import { PrismaClient, Order } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@exceptions/HttpException';
import Stripe from 'stripe';
import { stripe } from '@/utils/stripe';
import { FRONTEND_URL } from '@/config';

export interface GraphData {
  name: string;
  total: number;
}

@Service()
export class OrderService {
  public order = new PrismaClient().order;
  public store = new PrismaClient().store;
  public products = new PrismaClient().product;

  public async getOrders(storeId: string, paidOrders = false, count = false, graph = false): Promise<Order[] | number | GraphData[]> {
    if (!storeId) throw new HttpException(400, 'Store id is required.');
    if (count && paidOrders) {
      const count = await this.order.count({
        where: {
          storeId,
          isPaid: true,
        },
      });
      return count;
    }
    const orders = await this.order.findMany({
      where: {
        storeId,
        isPaid: paidOrders,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    if (graph) {
      const monthyRevenume: { [key: number]: number } = {};
      for (const order of orders) {
        const month = order.createdAt.getMonth();
        let revenueForOrder = 0;
        for (const item of order.orderItems) {
          revenueForOrder += Number(item.product.price);
        }
        monthyRevenume[month] = (monthyRevenume[month] || 0) + revenueForOrder;
      }
      const graphData: GraphData[] = [
        {
          name: 'Jan',
          total: 0,
        },
        {
          name: 'Feb',
          total: 0,
        },
        {
          name: 'Mar',
          total: 0,
        },
        {
          name: 'Apr',
          total: 0,
        },
        {
          name: 'May',
          total: 0,
        },
        {
          name: 'Jun',
          total: 0,
        },
        {
          name: 'Jul',
          total: 0,
        },
        {
          name: 'Aug',
          total: 0,
        },
        {
          name: 'Sep',
          total: 0,
        },
        {
          name: 'Oct',
          total: 0,
        },
        {
          name: 'Nov',
          total: 0,
        },
        {
          name: 'Dec',
          total: 0,
        },
      ];
      for (const month in monthyRevenume) {
        graphData[parseInt(month)].total = monthyRevenume[parseInt(month)];
      }
      return graphData;
    }
    return orders;
  }

  public async checkout(storeId: string, productIds: string[]) {
    if (!storeId) {
      throw new HttpException(400, 'storeId is required');
    }
    if (!productIds || productIds.length === 0) {
      throw new HttpException(400, 'productIds are required');
    }
    const products = await this.products.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    products.forEach(product => {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: 'USD',
          product_data: {
            name: product.name,
          },
          unit_amount: Number(product.price) * 100,
        },
      });
    });
    const order = await this.order.create({
      data: {
        storeId,
        isPaid: false,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: {
              connect: {
                id: productId,
              },
            },
          })),
        },
      },
    });
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: 'payment',
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${FRONTEND_URL}/cart?success=1`,
      cancel_url: `${FRONTEND_URL}/cart?canceled=1`,
      metadata: {
        orderId: order.id,
      },
    });
    return session.url;
  }
}
