const mysql = require('mysql2')

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'db_uas',
    port: 3306
})

conn.connect()

module.exports = conn