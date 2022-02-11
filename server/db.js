// connect server to database

const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password:"Deftones15$",
    host: "localhost",
    port: 5432,
    database: "grocotest"
})

function getUserEmails()
{
    return new Promise(function(resolve, reject)
    {
        pool.query("SELECT user_email FROM UserTable", (error, results) =>
        {
            if(error)
            {
                reject(error)
            }
            resolve(results.rows)
        })
        
    });
}
module.exports = {
    getUserEmails
}