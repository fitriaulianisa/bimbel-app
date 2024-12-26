const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const connectDB = require("./bimbel_api/models/db");

// Koneksi ke database
connectDB();

const app = express();

// Rute
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const jenisbimbelRouterApi = require('./bimbel_api/routes/jenisBimbel');
const jadwalRouterApi = require('./bimbel_api/routes/jadwal');
const userRouterApi = require('./bimbel_api/routes/user');
const muridRouterApi = require('./bimbel_api/routes/murid');
const guruRouterApi = require('./bimbel_api/routes/guru');
const materiRouterApi = require ('./bimbel_api/routes/materi')
const authRouterApi = require("./bimbel_api/routes/auth");

require("dotenv").config();
// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/jenisBimbel', jenisbimbelRouterApi);
app.use('/api/jadwal', jadwalRouterApi);
app.use('/api/user', userRouterApi);
app.use('/api/murid', muridRouterApi);
app.use('/api/guru', guruRouterApi);
// materi
app.use('/api/materi', materiRouterApi);
app.use('/api/auth', authRouterApi);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
