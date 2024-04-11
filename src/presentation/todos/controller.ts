import { Request, Response } from 'express';

const todos = [
  {id: 1, text: 'Find a new job'},
  {id: 2, text: 'Do your workout'},
  {id: 3, text: 'Visit Elias'}
];


export class TodosController {
  
  // * DI
  constructor(){}

  public getTodos =  (req: Request, res: Response) => {
    return res.json(todos);
  }
  public getTodoById =  (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({error: 'ID argument is not valid'});
    }
    const todo = todos.find(todo => id == todo.id);
    (todo)
      ? res.json(todo)
      : res.status(404).json({error: `Todo with id ${id} not found`})
  }

  public createTodos =  (req: Request, res: Response) => {
    const {text} = req.body;
    if(!text) return res.status(404).json({error: `Text property is required`});
    const newTodo = {id: todos.length + 1,text}
    todos.push(newTodo);
    return res.json(newTodo);
  }
  public updateTodo =  (req: Request, res: Response) => {
    const {text} = req.body;
    if(!text) return res.status(404).json({error: `Text property is required`});
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({error: 'ID argument is not valid'});

    const todo = todos.find(todo => id == todo.id);
    
    if(todo){
      todo.text = text;
      return res.json(todo)
    }
    return res.status(404).json({error: `Todo with id ${id} not found`});
  }

  public deleteTodo =  (req: Request, res: Response) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({error: 'ID argument is not valid'});
    }
    const todo = todos.find(todo => id == todo.id);
    if(todo){
      const index = todos.indexOf(todo);
      (index > -1) && todos.splice(index, 1);
      return res.json({msg: `Todo with id ${id} deleted`});
    }
    return res.status(404).json({error: `Todo with id ${id} not found`});
  }

}