const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const config = {
    host: 'localhost',
    user: 'postgres',
    database: 'phambets',
    password: process.env.DB_PASSWORD,
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
            await pool.query(query, values);
            return;
        }
        static async findUser(username = '') {
            const query = 'SELECT id, username, password FROM users WHERE username = $1';
            const values = [username];
            const res = await pool.query(query, values);
            return res.rows[0];
        }
        static async placeBet(id, name = '', type = 'money-line', amount = 5, numOfBets = 1) {
            const query = 'INSERT INTO bets(user_id, amount, num_of_bets, type, name) VALUES($1, $2, $3, $4, $5)';
            const values = [id, amount, numOfBets, type, name];
            await pool.query(query, values);
            return;
        }
    }
    return PGDB;
}

const db = createDB();
console.log(db);
module.exports = db;