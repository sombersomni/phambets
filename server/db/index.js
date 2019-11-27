const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const config = {
    host: process.env.DB_HOST || 'localhost',
    user: 'postgres',
    database: 'phambets',
    password: process.env.DB_PASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

function createDB() {
    const pool = new Pool(process.env.NODE_ENV === 'development' ? config : { connectionString: process.env.DATABASE_URL });
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
        static async configureTables() {
            const query = `
            CREATE TABLE users (
                id bigserial, 
                username varchar(255) NOT NULL, 
                email varchar(255) NOT NULL, 
                password varchar(255) NOT NULL, 
                is_admin boolean default false, 
                created_at date DEFAULT CURRENT_TIMESTAMP, 
                CONSTRAINT id_key PRIMARY KEY(id), 
                CONSTRAINT username_unique UNIQUE(username), 
                CONSTRAINT email_unique UNIQUE(email));`
            await pool.query(query);
        }
    }
    return PGDB;
}

const db = createDB();
console.log(db);
module.exports = db;