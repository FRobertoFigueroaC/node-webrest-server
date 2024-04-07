import { Router } from 'express';
import { TodosController } from './controller';


export class TodoRoutes {
  static get routes(): Router{
    const router = Router();

    const todoController = new TodosController();
    //TODO fix this below
    router.get('/api/todos', todoController.getTodos);

    return router
  }
}