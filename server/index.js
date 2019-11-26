const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes');
const cors = require('cors');
require('dotenv').config();
//middleware
const checkToken = require('./middleware/checkToken');
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(checkToken);
if (process.env.NODE_ENV === 'development') {
    app.use(cors());
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'build')));
}
app.use(router);
//set up postgres driver database
if (process.env.NODE_ENV === 'production') {
     app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
});