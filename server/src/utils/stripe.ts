import { STRIPE_API_KEY } from '@/config';
import Stripe from 'stripe';

export const stripe = new Stripe(STRIPE_API_KEY, {
  apiVersion: '2023-08-16',
  typescript: true,
});
