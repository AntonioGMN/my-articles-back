import dotenv from 'dotenv';

let envFile = '.env';

if (process.env.NODE_ENV === 'test') envFile = '.env.test';

dotenv.config({
  path: envFile,
});
