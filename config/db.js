import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'ditt passord',
    database: 'blog'
});

export default pool.promise();