import 'dotenv/config';
import { get } from 'env-var';


export const envs = {

  PORT: get('PORT').required().asPortNumber(),
  PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
  MONGO_URL: get( 'MONGO_URL' ).required().asString(),
  MONGO_DB_NAME: get( 'MONGO_DB_NAME' ).required().asString(),
  POSTGRES_URL: get('POSTGRES_URL').required().asString(),

}



