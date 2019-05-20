const express = require('express');
const cors = require('cors');

const errorHandlerMiddleware = require('express-api-problem/middleware');
const authMiddleware = require('./middlewares/auth-middleware');

// var session = require('./session');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const chatRouter = require('./routes/chat');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

// app.use(session);
app.use(cors());
app.use('/users', usersRouter);
app.use('/', authMiddleware, indexRouter);
app.use('/chat', authMiddleware, chatRouter);
app.use(errorHandlerMiddleware);

module.exports = app;