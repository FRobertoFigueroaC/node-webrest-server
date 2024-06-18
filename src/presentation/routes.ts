import { Router } from 'express';
import { TodoRoutes } from './todos/routes';
import { AuthRoutes } from './auth/routes';

export class AppRoutes {
  
  static get routes(): Router{
    const router = Router();

    router.use('/api/todos', TodoRoutes.routes);
    router.use('/api/auth', AuthRoutes.routes);

    return router
  }
}