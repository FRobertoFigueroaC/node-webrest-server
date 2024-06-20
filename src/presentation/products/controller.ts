import { Request, Response } from 'express';

export class ProductController {
  constructor(){}

  public getProducts = (req:Request, res:Response) => {
    res.json( 'Create products' );
  }
  public createProduct = (req:Request, res:Response) => {
    res.json( 'Create product' );
  }
}