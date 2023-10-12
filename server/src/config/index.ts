import { config } from 'dotenv';
config();
export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, STRIPE_API_KEY, FRONTEND_URL, STRIPE_WEBHOOK_SECRET } = process.env;
