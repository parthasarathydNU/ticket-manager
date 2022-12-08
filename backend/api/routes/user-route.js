import express from 'express';
import * as userController from './../controllers/user-controller.js';

const Router = express.Router();

Router.route('/').post(userController.post);
Router.route('/').get(userController.getAll);
Router.route('/:id').get(userController.get);
Router.route('/').put(userController.put);
Router.route('/:id').delete(userController.remove);
Router.route('/auth').post(userController.auth);

export default Router;