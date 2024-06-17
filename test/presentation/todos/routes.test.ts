import request from 'supertest'
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';


describe('Todo routes testing', () => {
  beforeAll(async()=> {
    await testServer.start()
  });

  afterEach(async () => {
    testServer.close();
    await prisma.todo.deleteMany();
  });

  const app = testServer.app;
  const todo1 = { text: 'Hola Mundo 1'};
  const todo2 = { text: 'Hola Mundo 2'};

  test('should return all the todos api/todos', async() => {
    // Arrange
    await prisma.todo.createMany({
      data: [todo1, todo2]
    });
    //Act    
    const { body } = await request(app)
      .get('/api/todos/')
      .expect(200);
    
    // Assert
    expect( body).toBeInstanceOf(Array);
    expect( body.length).toBe(2);
    expect( body[0].text).toBe(todo1.text);
    expect( body[1].text).toBe(todo2.text);
    expect( body[0].completedAt ).toBeFalsy();

  });

  test('should return a single todo with given id api/todos/:id', async() => {
    // Arrange
    const todo = await prisma.todo.create( {data: todo1});
    //Act
    const { body } = await request( app )
      .get( `/api/todos/${todo.id}` )
      .expect( 200 );
    // Assert
    expect(body).toEqual({
      id: todo.id,
      text: todo.text, 
      completedAt: null
    });
  });

  test('should return 4040 not found error when given id does not exist api/todos/:id', async() => {
    // Arrange
    const id = 999999;
    // Act
    const { body } = await request( app )
      .get( `/api/todos/${id}`)
      .expect( 404 );

    // Assert
    expect( body.error ).toBe(`Todo with ${id} not found`);
  });

  test('should return a new todo', async() => {
    // Arrange
    // Act
    const {body} = await request( app )
      .post( '/api/todos/' )
      .send(todo1)
      .expect( 201 );

    // Assert
    expect( body ).toEqual( {
      id: expect.any(Number),
      text: todo1.text,
      completedAt: null
    });

  });

  test('should return error if text is empty', async() => {
    // Arrange
    // Act
    const {body} = await request( app )
      .post( '/api/todos/' )
      .send({text: ''})
      .expect( 400 );

    // Assert
    expect( body ).toEqual( { error: 'Text property is required' } );
  });

  test('should update the text and completedAt from a created todo', async() => {
    // Arrange
    const todo = await prisma.todo.create( { data: todo1 } );
    const newText = 'Updated';
    const newCompletedAt = '05/12/2024'

    // Act
    const { body } = await request( app )
      .put( `/api/todos/${todo.id}` )
      .send( { text: newText, completedAt: newCompletedAt } )
      .expect( 201 );

    // Assert
    expect( body ).toEqual( {
      id: todo.id,
      text: newText,
      completedAt: '2024-05-12T06:00:00.000Z'
    });
  });


  test('should return 404 if todo not found', async() => {
    // Arrange
    const id = 999;
    // Act
    const { body } = await request( app )
      .put( `/api/todos/${id}` )
      .send( { text: 'test' } )
      .expect( 404 );

    // Assert
    expect( body ).toEqual( { error: `Todo with ${id} not found` } );
  });

  test('should return an updated todo only completedAt field', async() => {
    // Arrange
    const todo = await prisma.todo.create( { data: todo1 } );
    const newCompletedAt = '05/12/2024';

    // Act
    const { body } = await request( app )
      .put( `/api/todos/${ todo.id }` )
      .send( { completedAt: newCompletedAt } )
      .expect( 201 );

    // Assert
    expect( body ).toEqual( {
      id: todo.id,
      text: todo.text,
      completedAt: '2024-05-12T06:00:00.000Z'
    } );
  });

  test('should delete a todo previously created', async() => {
    // Arrange
    const todo = await prisma.todo.create( { data: todo1 } );
    // Act
    const { body } = await request( app )
      .delete( `/api/todos/${ todo.id }` )
      .expect( 200 );

    expect( body ).toEqual( {
      id: todo.id,
      text: todo.text,
      completedAt: todo.completedAt
    } );
  });

  test('should return 404 not found if trying to delete a non existing todo', async() => {
    // Arrange
    const id = 999;
    // Act
    const { body } = await request( app )
      .delete( `/api/todos/${ id }` )
      .expect( 404 );

    // Assert
    expect( body ).toEqual( { error: `Todo with ${ id } not found` } );
  });


});