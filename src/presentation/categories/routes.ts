import { Router } from 'express';
import { CategoryController } from './controller';

export class CategoryRoutes {
  static get routes(): Router {
    const router = Router();

    const categoryController = new CategoryController();


    router.get( '/', categoryController.getCategories );
    router.post( '/', categoryController.createCategory );

    return router;
  }
}