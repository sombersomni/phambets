const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
require('dotenv').config();
const router = require('./routes');
//middleware
const auth = require('./middleware/checkToken');
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === 'development') {
    const cors = require('cors');
    app.use(cors());
}

app.use(router);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'build')));

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
    });
}

app.post("/", auth, async (req, res) => {
    //find an existing user
    res.send(req.user);
});

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
    db.configureTables();
});