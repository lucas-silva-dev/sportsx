import { Router } from 'express';
import { UserController } from './controllers/UserController';

const userController = new UserController();

const routes = Router();

routes.post('/users', userController.create);
routes.get('/users', userController.index);
routes.get('/users/:id', userController.show);

export default routes;
