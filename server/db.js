// connect server to database
const {Client} = require('pg');
const  client = new Client({
    connectionString: 'postgres://xugpkdftkkfdvp:26514fe7141547f2062fd013cbfa20e63bc61763eac8640fc1e1490c47babe95@ec2-18-215-8-186.compute-1.amazonaws.com:5432/d8l6dun0c266uv',
    ssl:{
        rejectUnauthorized: false
    }
});
client.connect();


module.exports = client;