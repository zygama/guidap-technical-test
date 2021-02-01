module.exports = {
    type: 'mysql',
    host: process.env.db_host,
    port: process.env.db_port,
    username: process.env.db_username,
    password: process.env.db_password,
    database: process.env.db_database,
    synchronize: true,
    logging: false,
    entities: [
        'src/entity/**/*.ts'
    ],
    migrations: [
        'src/migration/**/*.ts'
    ],
    subscribers: [
        'src/subscriber/**/*.ts'
    ],
    cli: {
        entitiesDir: 'src/entity',
        migrationsDir: 'src/migration',
        subscribersDir: 'src/subscriber'
    }
};
