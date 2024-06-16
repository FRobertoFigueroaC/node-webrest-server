import { Router } from 'express';
import { TodosController } from './controller';
import { TodoDatasourceImpl } from '../../infrastructure/datasource/todo.datasource.impl';
import { TodoRepositoryImpl } from '../../infrastructure/repositories/todo.repository.impl';


export class TodoRoutes {
  static get routes(): Router{
    const router = Router();

    const dataSource = new TodoDatasourceImpl();
    const todoRepository = new TodoRepositoryImpl( dataSource );

    const todoController = new TodosController( todoRepository );
    //TODO fix this below
    router.get('/', todoController.getTodos);
    router.get('/:id', todoController.getTodoById);
    router.post('/', todoController.createTodos);
    router.put('/:id', todoController.updateTodo);
    router.delete('/:id', todoController.deleteTodo);

    return router
  }
}