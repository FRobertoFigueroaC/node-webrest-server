import { Router } from 'express';
import { ProductController } from './controller';

export class ProductRoutes {
  static get routes(): Router{
    const router = Router();
    const productController = new ProductController();
    router.get('/', productController.getProducts)
    router.post( '/', productController.createProduct )

    return router;
  }
}