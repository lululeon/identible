import 'reflect-metadata'
import { createConnection, getConnection, Connection } from 'typeorm'
import dbConnOptions from '@config/ormconfig'

export const connectToDB = async (): Promise<Connection> => {
  let connection: Connection | undefined

  try {
    connection = getConnection()
  } catch (error) {
    try {
      if (connection) {
        if (!connection.isConnected) {
          await connection.connect()
        }
      } else {
        connection = await createConnection(dbConnOptions)
      }
    } catch (e) {
      new Error()
      console.dir(e)
      console.error('ERROR: Database connection failed!!')
      throw e
    }
  }

  return connection
}

export const disconnectDB = async (connection: Connection): Promise<void> => {
  try {
    await connection.close()
  } catch (error) {
    console.error('ERROR: failed to closed db connection!!')
    throw error
  }
}
