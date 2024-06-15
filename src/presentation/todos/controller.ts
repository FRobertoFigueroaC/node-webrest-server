import { Request, Response } from 'express';
import { prisma } from '../../data/postgres'
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';




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
      where: {id}
    });
    (todo)
      ? res.json(todo)
      : res.status(404).json({error: `Todo with id ${id} not found`})
  }

  public createTodos =  async(req: Request, res: Response) => {
    const [ error, createTodoDto ] =  CreateTodoDto.create( req.body )
    if ( error ) return res.status(404).json({error});

    const todo = await prisma.todo.create({
      data: createTodoDto!
    });

    return res.json( todo );
  }
  public updateTodo =  async (req: Request, res: Response) => {
    const id = Number( req.params.id );
    const [ error, updateTodoDto ] = UpdateTodoDto.update( { ...req.body, id });
    const {text, completedAt} = req.body;

    if ( error ) return res.status(404).json({error});

    const todo = await prisma.todo.update({
      where: { id },
      data: updateTodoDto!.values
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