import { Router } from 'express';
import { ProductController } from './controller';
import { ProductService } from '../services/product.service';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class ProductRoutes {
  static get routes(): Router{
    const router = Router();
    const productService = new ProductService();
    const productController = new ProductController( productService );
    router.get('/', productController.getProducts)
    router.post( '/', [ AuthMiddleware.validateJWT ], productController.createProduct )

    return router;
  }
}