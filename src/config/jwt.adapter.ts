import jwt from 'jsonwebtoken'
import { envs } from './envs';

const JWT_SEED = envs.JWT_SEED;

export class jwtAdapter  {
  // DI?
  static async generateToken (payload:any, duration: string = '12h') {

    return new Promise((resolve) => {

      jwt.sign( payload, JWT_SEED, {expiresIn: duration}, (err, token) => {

        if ( err ) resolve(null);
        resolve(token)
      });
    });
  }

  static validateToken<T>(token: string): Promise<T | null>{
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SEED, (error, decoded) => {
        if(error) resolve(null);
        resolve(decoded as T);
      })
    });
  }
}