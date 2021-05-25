require('dotenv').config()
const express = require('express');
const app = express();
const port = 4000;
const db = require('./config/config');
const passport_jwt = require('./config/passort_jwt');
const cookieParser = require('cookie-parser');

app.use(express.urlencoded({
    extended: false
}))
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
    next();
});
app.use('/', require('./routes'));


app.listen(port, () => console.log(`Example app listening on port port! ${port}`));