import express from 'express';
import * as ticketController from '../controllers/ticket-controller.js';

const Router = express.Router();

Router.route('/').post(ticketController.post);
Router.route('/').get(ticketController.getAll);
Router.route('/:id').get(ticketController.get);
Router.route('/:id').put(ticketController.put);
Router.route('/:id').delete(ticketController.remove);

export default Router;