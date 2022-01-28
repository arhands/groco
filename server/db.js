// connect server to database

const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password:"Deftones15$",
    host: "localhost",
    port: 5432,
    database: "grocotest"
})

module.exports = pool;