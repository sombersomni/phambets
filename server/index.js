const express = require('express');
const app = express();
const path = require('path');
const pg = require('pg');
const router = require('./routes');
const cors = require('cors');
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(router);
//set up postgres driver database

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
})

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});