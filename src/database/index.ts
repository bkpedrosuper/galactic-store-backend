import { Connection, createConnection, getConnectionOptions } from 'typeorm'

const database = async (): Promise<Connection> => {

    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            database: process.env.NODE_ENV === 'test' ? './src/database/database.test.sqlite' : defaultOptions.database,
        })
    );
}

export default database;