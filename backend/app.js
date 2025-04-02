var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
const cors = require('cors');
const createError = require('http-errors');


var app = express();


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const tasksRouter = require('./routes/tasks');
app.use('/api/tasks',tasksRouter);

app.use((req,res,next)=>{
    next(createError(404));
});


module.exports = app;
