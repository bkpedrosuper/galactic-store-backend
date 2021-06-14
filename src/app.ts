import express from 'express'
import {router} from './routes'
import cors from 'cors'
import createConnection from './database'

createConnection();

const app = express();

const origin = process.env.ENV === 'local' ? '*' : 'https://galactic-store-frontend.vercel.app';

app.use(cors({
    origin
}));

app.use(express.json());
app.use(router);

export {app};