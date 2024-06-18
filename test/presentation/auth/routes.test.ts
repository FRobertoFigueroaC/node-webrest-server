import request from 'supertest';
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres/postgres'; 

describe('Auth routes tests', () => {
  beforeAll( async () => {
    await testServer.start();
  });

  afterEach( async () => {
    testServer.close();
  });

  const app = testServer.app;

  const user1 = { name: 'User 1', email: 'user1@test.com', password: '123456' };

  test('should register a user', async () => {
    // Arrange
    // Act
    const { body } = await request( app )
      .post( '/api/auth/register' )
      .send( user1 )
      .expect( 201 );

    // Assert
    expect( body ).toEqual( {
      id: expect.any( String ),
      name: user1.name,
      email: user1.email,
      emailValidated: false,
      password: expect.any( String ),
      role: expect.any(Array)
    } );
  });
});