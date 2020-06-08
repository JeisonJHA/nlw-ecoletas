import { Router } from 'express';
import PointsController from '../controller/PointsController';

const pointsRoutes = Router();
const pointsController = new PointsController();

pointsRoutes.post('/', pointsController.create);
pointsRoutes.get('/', pointsController.index);
pointsRoutes.get('/:id', pointsController.show);

export default pointsRoutes;
