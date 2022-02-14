// connect server to database

const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password:"HA9Gqj3h7OpvuibB",
    host: "35.224.114.175",
    port: 5432,
    database: "postgres"
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