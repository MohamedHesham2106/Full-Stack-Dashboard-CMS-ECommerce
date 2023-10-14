import { NextFunction, Request, Response } from 'express';
import Stripe from 'stripe';
import { stripe } from '@/utils/stripe';
import { PrismaClient } from '@prisma/client';
import { STRIPE_WEBHOOK_SECRET } from '@/config';

export class WebhookController {
  public order = new PrismaClient().order;
  public product = new PrismaClient().product;
  public post = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const body = req.body;
    console.log('body', body);
    const signature = req.headers['stripe-signature'] as string;
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
      const session = event.data.object as Stripe.Checkout.Session;
      const address = session?.customer_details?.address;

      const addressComponents = [address?.line1, address?.line2, address?.city, address?.state, address?.postal_code, address?.country];

      const addressString = addressComponents.filter(c => c !== null).join(', ');

      if (event.type === 'checkout.session.completed') {
        const order = await this.order.update({
          where: {
            id: session?.metadata?.orderId,
          },
          data: {
            isPaid: true,
            address: addressString,
            phone: session?.customer_details?.phone || '',
          },
          include: {
            orderItems: true,
          },
        });

        const productIds = order.orderItems.map(orderItem => orderItem.productId);

        await this.product.updateMany({
          where: {
            id: {
              in: [...productIds],
            },
          },
          data: {
            isArchived: true,
          },
        });
      }

      res.status(200).json(null);
    } catch (error) {
      console.log(error);
      res.status(400).send(`Webhook Error: ${error}`);
    }
  };
}
