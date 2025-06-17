import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import { NotFoundHandler } from './errors/NotFoundHandler';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

export const app: Application = express();

app.use(
  cors({
    origin: [
      "https://laeatery.com",
      'https://dashboard.laeatery.com',
      'http://192.168.10.16:3000',
      "https://laeatery-integration.vercel.app",
      'http://localhost:3000',
      'http://localhost:3001',
      "http://10.0.60.41:5174",
      "http://10.0.60.41:5173",
    ],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('uploads'));

app.use('/', routes);

app.get('/', async (req: Request, res: Response) => {
  res.json('Welcome to backend.laeatery.com');
});

app.use(globalErrorHandler);

app.use(NotFoundHandler.handle);
