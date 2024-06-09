import { Request, Response } from 'express';
import { prisma } from '../../data/postgres'

const todos = [
  {id: 1, text: 'Find a new job'},
  {id: 2, text: 'Do your workout'},
  {id: 3, text: 'Visit Elias'}
];


export class TodosController {
  
  // * DI
  constructor(){}

  public getTodos =  async(req: Request, res: Response) => {
    const todos = await prisma.todo.findMany();
    return res.json(todos);
  }
  public getTodoById =  async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({error: 'ID argument is not valid'});
    }
    
    const todo = await prisma.todo.findFirst({
      where: {id: id}
    });
    (todo)
      ? res.json(todo)
      : res.status(404).json({error: `Todo with id ${id} not found`})
  }

  public createTodos =  async(req: Request, res: Response) => {
    const {text} = req.body;
    if(!text) return res.status(404).json({error: `Text property is required`});

    const todo = await prisma.todo.create({
      data: {
        text,
        // completedAt: new Date().getTime().toString()
      }
    });

    return res.json( todo );
  }
  public updateTodo =  async (req: Request, res: Response) => {
    const {text} = req.body;
    if(!text) return res.status(404).json({error: `Text property is required`});
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({error: 'ID argument is not valid'});

    const todo = await prisma.todo.update({
      where: { id: id },
      data: {
        text
      }
    });
 
    if(todo){
      return res.json(todo)
    }
    return res.status(404).json({error: `Todo with id ${id} not found`});
  }

  public deleteTodo =  async(req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({error: 'ID argument is not valid'});
    }

    const todo = await prisma.todo.delete( {
      where: {id: id},
    });

  
    if(todo){
      return res.json({msg: `Todo with id ${id} deleted`});
    }
    return res.status(404).json({error: `Todo with id ${id} not found`});
  }

}