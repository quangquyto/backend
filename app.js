const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors=require('cors');

const passport = require('./modules/passport');
const loginRouter = require('./modules/passport/loginRouter');
var classRoomRouter = require('./routes/Classroom');
var registerRouter = require('./routes/Register');
var sendEmailRouter = require('./routes/SendEmail');
var assignmentRouter = require('./routes/Assignment');
var pointRouter = require('./routes/Point');
var excelRouter = require('./routes/FileExcel');
var importExcelRouter=require('./routes/ImportExcel');
var profileRouter = require('./routes/Profile');
var authorizationRouter=require('./routes/Authorization');
var googleSigninRouter = require('./routes/GoogleSignIn');
var facebookSigninRouter = require('./routes/FacebookSignIn');
var gradeReviewRouter=require('./routes/GradeReview');
var forgotPasswordRouter=require('./routes/ForgotPassword');
var adminRouter = require('./routes/Admin');
var userRouter =require('./routes/User');
var noticeRouter=require('./routes/Notification');
// const classesRouter = require('./api/classes');
// const accountsRouter = require('./api/accounts');
// const assignmentRouter = require('./api/assignment');
// const loginRouter = require('./modules/passport/loginRouter');
// const authRouter = require('./api/authenticator');
// const emailRouter = require('./api/email');
// const gradeRouter = require('./api/grades');
// const reviewRouter = require('./api/reviews');
// const notificationRouter = require('./api/notification');
const app = express();

// const connection = require("./database");
//connection.connect;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use(passport.initialize());
app.use('/login', loginRouter);
app.use('/classroom', classRoomRouter);
app.use('/register', registerRouter);
app.use('/sendEmail', sendEmailRouter);
app.use('/assignment', assignmentRouter);
app.use('/point',pointRouter);
app.use('/fileExcel',excelRouter);
app.use('/importExcel',importExcelRouter);
app.use('/profile',profileRouter);
app.use('/idenRole',authorizationRouter);
app.use('/google-sign-in',googleSigninRouter);
app.use('/facebook-sign-in',facebookSigninRouter);

app.use('/gradeReview',gradeReviewRouter);
app.use('/forgotPassword',forgotPasswordRouter);
app.use('/admin',adminRouter);
app.use('/user',userRouter);
app.use('/notification',noticeRouter);


// app.use('/classes', passport.authenticate('jwt', {session: false}), classesRouter);
// app.use('/accounts',  accountsRouter);
// app.use('/login', loginRouter);
// app.use('/auth', authRouter);
// app.use('/assignment',  passport.authenticate('jwt', {session: false}), assignmentRouter);
// app.use('/grades', passport.authenticate('jwt', {session: false}), gradeRouter);
// app.use('/sendEmail', passport.authenticate('jwt', {session: false}), emailRouter);
// app.use('/reviews', passport.authenticate('jwt', {session: false}), reviewRouter);
// app.use('/notification', passport.authenticate('jwt', {session: false}), notificationRouter);

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
    res.json({
      message: err.message,
      error: err
    });
});

module.exports = app;
