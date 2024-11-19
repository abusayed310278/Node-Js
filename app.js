const express = require("express");
const morgan = require("morgan");

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const rateLimit = require("express-rate-limit");
const helmet = require('helmet')
const xss = require('xss-clean')
const mongoSanitize = require('express-mongo-sanitize')
const hpp = require('hpp');
const reviewRouter = require('./routes/reviewRoutes')

const app = express();

/*global middleware */
// Set security HTTP headers
app.use(helmet())
if (process.env.NODE_ENV === 'development') {

    app.use(morgan("dev"));
}

// Limit requests from same API
const limiter = rateLimit({
                              max: 100,
                              windowMs: 100,
                              message: 'Too many requests from this IP, please try again in an hour!'
                          })

app.use('/api', limiter)


//middleware b/w req and res
app.use(express.json());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())

// Data sanitization against XSS
app.use(xss())

// Body parser, reading data from body into req.body
app.use(express.json({limit: '10kb'}))

// Prevent parameter pollution
app.use(hpp({
                whitelist: [
                    'duration',
                    'ratingsQuantity',
                    'ratingsAverage',
                    'maxGroupSize',
                    'difficulty',
                    'price'
                ]
            }))


//use route for middleware for rendering static file
app.use(express.static(`${__dirname}/public`))

//middleware order matters
// app.use((req, res, next) => {
//     console.log("Query Completed");
//     next();
// });

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();

    console.log(req.headers)
    next();
});

//route handlers

//routes

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter)


//all route handles which does not have any url defined
app.all('*', (req, res, next) => {

    // res.status(404).json({
    //     status:'fail',
    //     message:`can't find ${req.originalUrl} on this server`
    // })

    // const err=new Error(`can't find ${req.originalUrl} on this server`)
    // err.status='fails'
    // err.statusCode=404

    next(new AppError(`can't find ${req.originalUrl} on this server`, 404))

})

//error handling middleware
app.use(globalErrorHandler)


//start server

module.exports = app;