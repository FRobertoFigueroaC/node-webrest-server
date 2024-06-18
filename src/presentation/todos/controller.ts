import { Request, Response } from 'express';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { CreateTodo, GetTodo, GetTodos,UpdateTodo, TodoRepository, DeleteTodo, CustomError } from '../../domain';
import { ErrorHandler } from '../../infrastructure/helpers/errorHandler';




export class TodosController {

  // * DI
  constructor( private readonly todoRepository: TodoRepository ) {

  }
  /*
  */
  public getTodos = ( req: Request, res: Response ) => {
    new GetTodos(this.todoRepository)
    .execute()
    .then(todos => res.json(todos) )
    .catch( error => ErrorHandler.throwError( res, error ) )
  };

  /*
  */
  public getTodoById = ( req: Request, res: Response ) => {
    const id = Number( req.params.id );
    if ( isNaN( id ) ) {
      const error = CustomError.badRequest('ID argument is not valid')
      return ErrorHandler.throwError( res, error );
    }
    new GetTodo(this.todoRepository)
      .execute( id )
      .then( todo => res.json( todo ) )
      .catch( error => ErrorHandler.throwError( res, error ) )
  };

  /*
  */
  public createTodos = ( req: Request, res: Response ) => {
    const [ error, createTodoDto ] = CreateTodoDto.create( req.body );
    if (error) {
      const customError = CustomError.badRequest( error );
      return ErrorHandler.throwError( res, customError );
    }

    new CreateTodo(this.todoRepository)
      .execute( createTodoDto!)
      .then( todo => res.status(201).json( todo ) )
      .catch( error => ErrorHandler.throwError( res, error ) )
  };

  /*
  */
  public updateTodo = ( req: Request, res: Response ) => {
    const id = Number( req.params.id );
    const [ error, updateTodoDto ] = UpdateTodoDto.update( { ...req.body, id } );
    if ( error ) {
      const customError = CustomError.badRequest( error );
      return ErrorHandler.throwError( res, customError );
    }

    new UpdateTodo(this.todoRepository)
      .execute( updateTodoDto!)
      .then( todo => res.status(201).json( todo ) )
      .catch( error => ErrorHandler.throwError( res, error ) )
  };

  /*
  */
  public deleteTodo = ( req: Request, res: Response ) => {
    const id = Number( req.params.id );
    if ( isNaN( id ) ) {
      const customError = CustomError.badRequest( 'ID argument is not valid' );
      return ErrorHandler.throwError( res, customError );
    }

    new DeleteTodo(this.todoRepository)
    .execute(id)
    .then( todo => res.json( todo ) )
    .catch( error => ErrorHandler.throwError( res, error ) )
  };

}