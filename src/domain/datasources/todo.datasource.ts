import { TodoEntity } from '../entities/todo.entity';
import { CreateTodoDto, UpdateTodoDto } from '../dtos';

export abstract class TodoDataSource {
  abstract create( createTodoDto: CreateTodoDto ):Promise<TodoEntity>
  // Todo: pagination
  abstract getAll( ):Promise<TodoEntity[]>
  abstract findById( id: number ):Promise<TodoEntity>
  abstract updateTodo( updateTodoDto: UpdateTodoDto ):Promise<TodoEntity>
  abstract deleteById( id: number ):Promise<TodoEntity>
}