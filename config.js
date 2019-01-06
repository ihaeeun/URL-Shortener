const mysql = require('mysql');
const util = require('util');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1111',
    database: 'url'
});

conn.connect();

const db = util.promisify(conn.query).bind(conn)

module.exports = db;