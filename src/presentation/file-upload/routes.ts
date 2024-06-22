import { Router } from 'express';
import { FileUploadController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { FileUploadService } from '../services/file-upload.service';

export class FileUploadRoutes {
  static get routes(): Router{
    const router = Router();
    const fileUploadService = new FileUploadService();

    const fileController = new FileUploadController( fileUploadService  );

    // api/upload/single/<user|category|product>/
    // api/upload/multiple/<user|category|product>/

    router.post( '/single/:type', [ AuthMiddleware.validateJWT ], fileController.uploadFile );
    router.post( '/multiple/:type', [ AuthMiddleware.validateJWT ], fileController.uploadMultipleFile );

    return router;
  }
}