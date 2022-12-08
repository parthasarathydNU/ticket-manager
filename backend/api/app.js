/**
 * App file for the backend
 * Author: Aravind Dasarathy
 * Date: 08/12/2022
 *
 * @module app
 * @requires express
 * @requires cors
 * @requires mongoose
 * @requires routes
 * @requires configs
 */

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes/index.js';
import configs from './configs/index.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded());

routes(app);

mongoose.connect(configs.db.url);

export default app;