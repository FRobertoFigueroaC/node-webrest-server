import { NextFunction, Request, Response } from 'express';
import { CustomError, UserEntity } from '../../domain';
import { ErrorHandler } from '../../infrastructure/helpers/errorHandler';
import { jwtAdapter } from '../../config/jwt.adapter';
import { UserModel } from '../../data/mongo';

export class AuthMiddleware {
  static async validateJWT(req:Request, res:Response, next:NextFunction) {
    const authorization = req.header('Authorization');
    if ( !authorization ) {
      return ErrorHandler.throwError( res, CustomError.unAuthorized('No token was provided'));
    }
    if ( !authorization.startsWith('Bearer ')) {
      return ErrorHandler.throwError( res, CustomError.unAuthorized('Invalid Bearer token'));
    }
    const token = authorization.split(' ').at(1) || '';

    try {
      const payload = await jwtAdapter.validateToken<{id: string}>(token);
      if ( !payload ) return ErrorHandler.throwError( res, CustomError.unAuthorized('Invalid token'));
      const user = await UserModel.findById(payload.id);
      if ( !user ) return ErrorHandler.throwError( res, CustomError.unAuthorized('No user found token'));

      // TODO : Validar si el usuario esta activo 

      req.body.user = UserEntity.fromObject(user);
      next();

    } catch (error) {
      return ErrorHandler.throwError( res, CustomError.internalServer('Token could not be validated'));
    }
  }
}