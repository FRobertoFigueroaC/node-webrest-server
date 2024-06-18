import { Router } from 'express';
import { AuthController } from './controller';


export class AuthRoutes {
  static get routes():Router {
    const router = Router();

    const authController = new AuthController();

    router.post('/login', authController.login)
    router.post('/register', authController.register)
    router.get( '/validate-email/:token', authController.validateEmail )
    router.post('/logout', authController.logout)
    return router
  }
}