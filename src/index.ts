import dotenv from 'dotenv';
import log4js from 'log4js';
import express, { Express } from 'express';
import { useExpressServer } from 'routing-controllers';
import { UserController } from './controller/user-controller';
import bodyParser from 'body-parser';
import httpContext from 'express-http-context';
import PgRx from 'pg-reactive';
import { GlobalErrorHandler } from './middleware/global-error-handler';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../src/swagger/openapi.json';
import cors from 'cors';
import { MeetingController } from './controller/meeting-controller';

dotenv.config();
export const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL;
const port = process.env.PORT;


export const db = new PgRx({
  host: 'ec2-54-246-85-151.eu-west-1.compute.amazonaws.com',
  database: 'derbn5lnj0iukq',
  user: 'uxggkygkspduiy',
  port: 5432,
  password: 'cf927aeab131cedb1e20b3f748f5644e33bf471ca54b503423244e7fcef94898',
  ssl: { rejectUnauthorized: false }
});


const app: Express = express();
app.use(bodyParser.json());
app.use(httpContext.middleware);
app.use(cors({ origin: 'http://localhost:8888' }));


useExpressServer(app, {
  controllers: [UserController, MeetingController],
  middlewares: [GlobalErrorHandler],
  defaultErrorHandler: false
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, () => console.log(`Running on port http://localhost:${port}/`));
// logger.info('log4js log info');
// logger.debug('log4js log debug');
// logger.error('log4js log error');
