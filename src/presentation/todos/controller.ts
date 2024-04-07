import { Request, Response } from 'express';


export class TodosController {
  
  // * DI
  constructor(){}

  public getTodos =  (req: Request, res: Response) => {
    return res.json([
      {id: 1, text: 'Find a new job'},
      {id: 1, text: 'Do your workout'},
      {id: 1, text: 'Visit Elias'}
    ]);
  }
}