import { Router } from 'express';

import itemsRoutes from '@modules/items/infra/http/routes/items.routes';
import pointsRoutes from '@modules/points/infra/http/routes/points.routes';

const routes = Router();

routes.use('/items', itemsRoutes);
routes.use('/points', pointsRoutes);

export default routes;
