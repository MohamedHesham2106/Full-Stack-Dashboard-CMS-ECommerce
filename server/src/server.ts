import { App } from '@/app';

import { ValidateEnv } from '@utils/validateEnv';
import { StoreRoute } from './routes/store.route';
import { BillboardRoute } from './routes/billboard.route';
import { CategoryRoute } from './routes/category.route';
import { SizeRoute } from './routes/size.route';
import { ColorRoute } from './routes/color.route';
import { ProductRoute } from './routes/product.route';
import { OrderRoute } from './routes/order.route';
import { WebhookRoute } from './routes/webhook.route';

ValidateEnv();

const app = new App([
  new StoreRoute(),
  new BillboardRoute(),
  new CategoryRoute(),
  new SizeRoute(),
  new ColorRoute(),
  new ProductRoute(),
  new OrderRoute(),
  new WebhookRoute(),
]);

app.listen();
