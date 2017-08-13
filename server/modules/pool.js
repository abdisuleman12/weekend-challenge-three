var pg = require('pg');

var config = {
    database: 'abdisuleman', // name of database
    host: 'localhost', // where your database is located
    port: 5432, // port of call for database
    max: 10, // number of connections allowed at one time
    idleTimeoutMillis: 30000 // 30 seconds to try and connect
};

module.exports = pg.Pool(config);