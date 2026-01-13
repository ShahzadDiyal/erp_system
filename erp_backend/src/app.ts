import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';


import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';

const app: Application = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// HTTP request logger
app.use(morgan("dev"))

app.use('/api', routes)


//test api
app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'OK',
    service: 'ERP Backend',
    timestamp: new Date().toISOString()
  });
});


app.use(errorHandler);

export default app;