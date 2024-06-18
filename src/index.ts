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
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
const port = process.env.PORT || 3000;
// =====================================================================================================================
/** db connection*/
export const db = new PgRx({
  host: 'dpg-cpor4b2ju9rs738undo0-a.oregon-postgres.render.com',
  database: 'portfolio_meetings_db',
  user: 'portfolio_meetings_db_user',
  port: 5432,
  password: 'gCtWs84simOgv7QIiZ8eOoJegfIw25eu',
  ssl: { rejectUnauthorized: false }
});
// =====================================================================================================================
/** Express global settings*/
const app: Express = express();
app.use(bodyParser.json());
app.use(httpContext.middleware);

app.use(cors());


useExpressServer(app, {
  controllers: [UserController, MeetingController],
  middlewares: [GlobalErrorHandler],
  defaultErrorHandler: false
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.listen(port, () => console.log(`Running on port http://localhost:${port}/api-docs`));
