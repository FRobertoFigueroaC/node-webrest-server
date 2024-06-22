import { Router } from 'express';

import { AuthMiddleware } from '../middlewares/auth.middleware';
import { ImageController } from './controller';
import { TypeMiddleware } from '../middlewares/type.middleware';


export class ImageRoutes {
  static get routes(): Router {
    const router = Router();

    const imageController = new ImageController();

    router.use( AuthMiddleware.validateJWT );
    // users/5135bdcc-94c8-4ef9-bd4f-fbc422470946.jpeg
    router.get( '/:type/:img', imageController.getImage );

    return router;
  }
}