/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import config from './app/config';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import notFound from './app/middlewares/notFound';
import path from 'path';


const app: Application = express();

app.use(
  cors({
    credentials: true,
    origin: [config.client_url as string],
  })
);


app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use('/api/v1', routes);


//Testing
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Welcome to 🌸 Gardening Tips ',
  });
});



//global error handler
app.use(globalErrorHandler);


// Not found 

app.use(notFound)


export default app;

