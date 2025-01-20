import express, { Application } from 'express';
import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import 'dotenv/config';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import { stream, logger } from './services/logger';

const app: Application = express();
const port = Number(process.env.PORT) || 3000;

const corsOptions: CorsOptions = {
  origin: ['http://localhost:8080'],
  credentials: true,
};

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(morgan('combined', { stream }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  logger.info(`App listening on port ${port}`);
});
