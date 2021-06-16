import express from 'express'
import {router} from './routes'
import cors from 'cors'
import createConnection from './database'

createConnection();

const app = express();

// const origin = process.env.NODE_ENV === 'development' ? '*' : 'https://galactic-store-frontend.vercel.app';

// apenas para a avaliação
const origin = process.env.NODE_ENV === 'development' ? '*' : '*';

app.use(cors({
    origin
}));

app.use(express.json());
app.use(router);

export {app};