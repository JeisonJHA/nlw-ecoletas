import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { errors } from 'celebrate';

import 'express-async-errors';

import AppError from '@shared/errors/AppError';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  '/uploads',
  express.static(path.resolve(__dirname, '..', '..', '..', '..', 'uploads')),
);
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }
  console.log(err.message);
  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error.' });
});

export default app;
