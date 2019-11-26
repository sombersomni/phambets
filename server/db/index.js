const { Pool } = require('pg');
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
        static async findUser(username) {
            const query = 'Select * From users Where username = $1';
            const values = [username];
            try {
                const res = await pool.query(query, values);
                return res.rows[0];
            } catch(err) {
                console.log(err.stack);
                return null;
            }

        }
    }
    return PGDB;
}

const db = createDB();
console.log(db);
module.exports = db;