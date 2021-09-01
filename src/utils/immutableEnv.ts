import dotenv from 'dotenv'
dotenv.config()

import { cleanEnv, str, host, port, bool } from 'envalid'

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'test', 'production'],
    default: 'production',
  }),

  // server
  PORT: port(),
  SECRET_KEY: str(),
  CORS_ORIGIN: str(),
  CORS_CREDENTIALS: bool(),

  // database
  DB_HOST: host({ devDefault: 'localhost' }),
  DB_PORT: port(),
  DB_NAME: str(),
  DB_USER: str(),
  DB_PASS: str(),
})

export default env
