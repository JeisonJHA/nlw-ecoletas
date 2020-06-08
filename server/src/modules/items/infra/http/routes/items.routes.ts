import { Router } from 'express';

import ItemController from '../controller/ItemController';

const userRoutes = Router();
const itemController = new ItemController();

userRoutes.get('/', itemController.index);

export default userRoutes;
