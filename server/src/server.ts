import { App } from '@/app';

import { ValidateEnv } from '@utils/validateEnv';
import { StoreRoute } from './routes/store.route';
import { BillboardRoute } from './routes/billboard.route';
import { CategoryRoute } from './routes/category.route';
import { SizeRoute } from './routes/size.route';
import { ColorRoute } from './routes/color.route';

ValidateEnv();

const app = new App([new StoreRoute(), new BillboardRoute(), new CategoryRoute(), new SizeRoute(), new ColorRoute()]);

app.listen();
