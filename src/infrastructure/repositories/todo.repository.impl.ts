import { CreateTodoDto, TodoDataSource, TodoEntity, TodoRepository, UpdateTodoDto } from '../../domain';

export class TodoRepositoryImpl implements TodoRepository{

  constructor(
    private readonly datasource:TodoDataSource
  ) {
    
  }
  create( createTodoDto: CreateTodoDto ): Promise<TodoEntity> {
    return this.datasource.create(createTodoDto);
  }
  getAll(): Promise<TodoEntity[]> {
    return this.datasource.getAll();
  }
  findById( id: number ): Promise<TodoEntity> {
    return this.datasource.findById(id);
  }
  updateTodo( updateTodoDto: UpdateTodoDto ): Promise<TodoEntity> {
    return this.datasource.updateTodo( updateTodoDto );
  }
  deleteById( id: number ): Promise<TodoEntity> {
    return this.datasource.deleteById(id);
  }
}