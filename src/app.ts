import express, { Express } from 'express';
import helmet from 'helmet';
import nocache from 'nocache';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import routes from './routes';

export const app: Express = express();
app.use(helmet());
app.use(nocache());
app.use(
    cors({
        origin: process.env.NODE_ENV !== 'production' ? process.env.LOCAL_URL : process.env.CLIENT_URL,
        credentials: true
    })
);
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(compression());

app.use(process.env.BASE_URL, routes);
