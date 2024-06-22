import { Router } from 'express';
import { FileUploadController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { FileUploadService } from '../services/file-upload.service';
import { FileUploadMiddleware } from '../middlewares/file-upload.middleware';
import { TypeMiddleware } from '../middlewares/type.middleware';

export class FileUploadRoutes {
  
  static get routes(): Router {
    const router = Router();
    const fileUploadService = new FileUploadService();
    const fileController = new FileUploadController( fileUploadService  );

    // api/upload/single/<user|category|product>/
    // api/upload/multiple/<user|category|product>/

    router.use(AuthMiddleware.validateJWT);
    router.use(FileUploadMiddleware.containFiles);
    router.use( TypeMiddleware.validTypes( [ 'users', 'products', 'categories' ] ));

    router.post(
      '/single/:type',
      fileController.uploadFile
    );
    router.post( '/multiple/:type',  fileController.uploadMultipleFile );

    return router;
  }
}