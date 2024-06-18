import { CustomError } from '../errors/custom.error';


export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public emailValidated: boolean,
    public password: string,
    public role: string[],
    public img?: string,
  ) {
    
  }

  static fromObject(object:{[key:string]: any}): UserEntity{
    const { id, _id, name, email, emailValidated, password, role, img } = object;

    if (!_id && !id) throw CustomError.badRequest('Missing id');
    const userId = _id || id;
    if ( !name || name.trim().length < 1 ) throw CustomError.badRequest('Missing Name');
    if (!email || email.trim().length < 1) throw CustomError.badRequest('Missing email');
    if ( emailValidated  === undefined) throw CustomError.badRequest('Missing emailValidated');
    if ( !password || password.trim().length < 1 )throw CustomError.badRequest('Missing password');
    if ( !role || role.length < 1 ) throw CustomError.badRequest('Missing role');

    return new UserEntity( userId , name, email, emailValidated, password, role, img)

  }
}