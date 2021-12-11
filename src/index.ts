import dotenv from 'dotenv';
import express, { Express } from 'express';
import { useExpressServer } from 'routing-controllers';
import { UserController } from './controller/user.controller';
import bodyParser from 'body-parser';
import httpContext from 'express-http-context';
import PgRx from 'pg-reactive';
import { GlobalErrorHandler } from './middleware/globalErrorHandler';
import swaggerUi from 'swagger-ui-express';
import * as swaggerDocument from '../src/swagger/openapi.json';
import cors from 'cors';
import { MeetingController } from './controller/meeting.controller';

dotenv.config();


const port = process.env.PORT;

// =====================================================================================================================
/** db connection*/
export const db = new PgRx({
  host: 'ec2-54-246-85-151.eu-west-1.compute.amazonaws.com',
  database: 'derbn5lnj0iukq',
  user: 'uxggkygkspduiy',
  port: 5432,
  password: 'cf927aeab131cedb1e20b3f748f5644e33bf471ca54b503423244e7fcef94898',
  ssl: { rejectUnauthorized: false }
});
// =====================================================================================================================
/** Express global settings*/
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
