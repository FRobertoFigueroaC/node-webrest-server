import { Request, Response } from 'express';

import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { CreateTodo, GetTodo, GetTodos,UpdateTodo, TodoRepository, DeleteTodo } from '../../domain';




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
    .catch(error => res.status(400).json({error}))
  };

  /*
  */
  public getTodoById = ( req: Request, res: Response ) => {
    const id = Number( req.params.id );
    if ( isNaN( id ) ) {
      return res.status( 400 ).json( { error: 'ID argument is not valid' } );
    }
    new GetTodo(this.todoRepository)
      .execute( id )
      .then( todo => res.json( todo ) )
      .catch( error => res.status( 404 ).json( { error } ) )
  };

  /*
  */
  public createTodos = ( req: Request, res: Response ) => {
    const [ error, createTodoDto ] = CreateTodoDto.create( req.body );
    if ( error ) return res.status( 404 ).json( { error } );

    new CreateTodo(this.todoRepository)
      .execute( createTodoDto!)
      .then( todo => res.json( todo ) )
      .catch( error => res.status( 400 ).json( { error } ) )
  };

  /*
  */
  public updateTodo = ( req: Request, res: Response ) => {
    const id = Number( req.params.id );
    const [ error, updateTodoDto ] = UpdateTodoDto.update( { ...req.body, id } );
    if ( error ) return res.status( 404 ).json( { error } );

    new UpdateTodo(this.todoRepository)
      .execute( updateTodoDto!)
      .then( todo => res.json( todo ) )
      .catch( error => res.status( 400 ).json( { error } ) )
  };

  /*
  */
  public deleteTodo = ( req: Request, res: Response ) => {
    const id = Number( req.params.id );
    if ( isNaN( id ) ) {
      return res.status( 400 ).json( { error: 'ID argument is not valid' } );
    }

    new DeleteTodo(this.todoRepository)
    .execute(id)
      .then( todo => res.json( { msg: `Todo with id ${ id } deleted` } ) )
      .catch( error => res.status( 404 ).json( { error } ) )
  };

}