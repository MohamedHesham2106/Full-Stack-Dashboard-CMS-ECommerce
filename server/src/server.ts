import { App } from '@/app';

import { ValidateEnv } from '@utils/validateEnv';
import { StoreRoute } from './routes/store.route';

ValidateEnv();

const app = new App([new StoreRoute()]);

app.listen();
