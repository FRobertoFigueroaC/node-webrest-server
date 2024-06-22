import mongoose from 'mongoose';

export class Validators {

  public static readonly imageExtensions = [ 'png', 'jpg', 'jpeg', 'gif' ];

  static isMongoId(id: string){
    return mongoose.isValidObjectId(id);
  }
  static isImageFile(extension:string){
    return this.imageExtensions.includes(extension)
  }
}