const mysql = require('mysql2/promise');
const config = {
    db:{
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'wow'
    },
    listPerPage: 10
}

async function query(sql, params){
    const connection = await mysql.createConnection(config.db);
    const [results,] = await connection.execute(sql,params);
    connection.end();
    return results
}
module.exports = {
    query
}