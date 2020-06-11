import { Router } from 'express';
import multer from 'multer';
import { celebrate, Joi } from 'celebrate';

import MulterConfig from '@config/multer';

import PointsController from '../controller/PointsController';

const upload = multer(MulterConfig);

const pointsRoutes = Router();
const pointsController = new PointsController();

pointsRoutes.post(
  '/',
  upload.single('image'),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required().max(2),
      }),
    },
    {
      abortEarly: false,
    },
  ),
  pointsController.create,
);
pointsRoutes.get('/', pointsController.index);
pointsRoutes.get('/:id', pointsController.show);

export default pointsRoutes;
