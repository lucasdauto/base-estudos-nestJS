module.exports = {
    type: "mysql",
    host: "localhost",
    port: "3306",
    username: "root",
    password: "docker",
    database: "db_courses_nest",
    entities: ["dist/**/*.entity.js"],
    migrations: ["dist/migrations/*.js"],
    cli: {
        migrationsDir: "src/migrations"
    }
}