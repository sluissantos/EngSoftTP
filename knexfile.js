module.exports = {
    development: {
        client: "mysql",
        connection: {
            host: "disney-med.ctslaxzrfqjd.us-east-1.rds.amazonaws.com",
            port: 3306,
            database: "DisneyMedical",
            user: "admin",
            password: "ihRT82wkOi0qhvoZvOqL",
        },
        pool: {
            min: 0,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
            directory: `${__dirname}/src/database/migrations`,
        },
        seeds: {
            directory: `${__dirname}/src/database/seeds`,
        },
    },
};
