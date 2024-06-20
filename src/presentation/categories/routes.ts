import { Router } from 'express';
import { CategoryController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();

    const categoryController = new CategoryController();


    router.get( '/', categoryController.getCategories );
    router.post( '/', [ AuthMiddleware.validateJWT ], categoryController.createCategory );

    return router;
  }
}