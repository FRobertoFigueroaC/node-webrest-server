import { envs } from '../src/config/envs';
import { Server } from '../src/presentation/server';
import { MongoDatabase } from '../src/data/mongo';

jest.mock('../src/presentation/server');
jest.mock('../src/data/mongo');


describe('Testing App.ts', () => {
  
  test.skip('should call server with arguments and start', async () => {
    await import('../src/app');


    expect( MongoDatabase ).toHaveBeenCalledTimes(1);
    expect( MongoDatabase ).toHaveBeenCalledWith({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL
    });

    expect(Server).toHaveBeenCalledTimes(1);
    expect(Server).toHaveBeenCalledWith({
      port: envs.PORT,
      public_path: envs.PUBLIC_PATH,
      routes: expect.any(Function)
    });

    expect(Server.prototype.start).toHaveBeenCalled();
  });

});