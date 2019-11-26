const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const config = {
    host: 'localhost',
    user: 'postgres',
    database: 'phambets',
    password: process.env.DB_PASSWORD || 'teddyrick',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

function createDB() {
    const pool = new Pool(config);
    class PGDB {
        static async addUser(username = '', email = '', password = '') {
            const query = 'INSERT INTO users(username, email, password) VALUES($1, $2, $3)';
            const hashedPassword = await bcrypt.hash(password, 10);
            const values = [username, email, hashedPassword];
            const res = await pool.query(query, values);
        }
        static async findUser(username = '') {
            const query = 'SELECT id, username, password FROM users WHERE username = $1';
            const values = [username];
            const res = await pool.query(query, values);
            return res.rows[0];
        }
    }
    return PGDB;
}

const db = createDB();
console.log(db);
module.exports = db;