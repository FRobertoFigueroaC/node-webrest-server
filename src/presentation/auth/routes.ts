import { Router } from 'express';
import { AuthController } from './controller';
import { UserDataSourceImpl } from '../../infrastructure/datasource/user.datasource.impl';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';
import { AuthService } from '../services/auth.service';


export class AuthRoutes {
  static get routes():Router {
    const router = Router();

    // const dataSource = new UserDataSourceImpl();
    // const userRepository = new UserRepositoryImpl( dataSource );

    const authService = new AuthService();

    const authController = new AuthController( authService );

    router.post('/login', authController.login)
    router.post('/register', authController.register)
    router.get( '/validate-email/:token', authController.validateEmail )
    router.post('/logout', authController.logout)
    return router
  }
}