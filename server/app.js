const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const session = require('express-session');
const mongo = require('mongoose');
const passport = require('passport');
const connectMongo = require('connect-mongo');
const {cors} = require('./utils/helper');

const { DB_URI, SESSION_SECRET, SESSION_MAX_AGE } = require('./utils/constants');
const router = require('./routes/router');
const branchRouter = require('./routes/branch_router');
const customerRouter = require('./routes/customer_router');
const employeeRouter = require('./routes/employee_router');
const flowerRouter = require('./routes/flower_router');
const contactsRouter = require('./routes/contacts_router');
const paymentRouter = require('./routes/orders_router');
const passportStrategy = require('./encryption/passport');
const employeeRepository = require('./model')('Employee');
const customerRepository = require('./model')('Customer');
const MongoStore = connectMongo(session);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(cookieParser(SESSION_SECRET));
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors);

const uri = DB_URI;
const sessionConnect = mongo.createConnection();
const connectionOptions = { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true };

(async () => {
  try {
    await sessionConnect.openUri(uri, connectionOptions);
  } catch (err) {
    console.error(`Error while trying connecting to mongo DB: ${err}`);
  }
})();

app.use(
    session(
        {
          name: 'users.sid',
          secret: SESSION_SECRET,
          resave: false,
          saveUninitialized: false,
          rolling: true,
          store: new MongoStore({ mongooseConnection: sessionConnect }),
          cookie: { maxAge: SESSION_MAX_AGE, httpOnly: true, sameSite: true }
        }
    )
);

app.use(passport.initialize());
passport.serializeUser(employeeRepository.serializeUser());
passport.deserializeUser(employeeRepository.deserializeUser());
passport.serializeUser(customerRepository.serializeUser());
passport.deserializeUser(customerRepository.deserializeUser());
passport.use(passportStrategy);

app.use('/', router);
app.use('/customer', customerRouter);
app.use('/employee', employeeRouter);
app.use('/branch', branchRouter);
app.use('/flower', flowerRouter);
app.use('/contacts', contactsRouter);
app.use('/orders', paymentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ success: 'false', description: err.message });
});

module.exports = app;
