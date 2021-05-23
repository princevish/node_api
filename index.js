require('dotenv').config()
const express = require('express');
const app = express();
const port = 4000;
const db =require('./config/config')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/', require('./routes'));


app.listen(port, () => console.log(`Example app listening on port port! ${port}`))