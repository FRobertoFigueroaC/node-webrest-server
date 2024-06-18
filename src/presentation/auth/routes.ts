import { Router } from 'express';
import { AuthController } from './controller';
import { UserDataSourceImpl } from '../../infrastructure/datasource/user.datasource,impl';
import { UserRepositoryImpl } from '../../infrastructure/repositories/user.repository.impl';


export class AuthRoutes {
  static get routes():Router {
    const router = Router();

    const dataSource = new UserDataSourceImpl();
    console.log( dataSource )
    const userRepository = new UserRepositoryImpl( dataSource );
    console.log( userRepository )

    const authController = new AuthController( userRepository );

    router.post('/login', authController.login)
    router.post('/register', authController.register)
    router.get( '/validate-email/:token', authController.validateEmail )
    router.post('/logout', authController.logout)
    return router
  }
}