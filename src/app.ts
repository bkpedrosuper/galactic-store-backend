import express from 'express'
import {router} from './routes'
import cors from 'cors'
import createConnection from './database'

createConnection();

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

export {app};