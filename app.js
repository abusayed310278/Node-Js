const express = require("express");
const morgan = require("morgan");

const AppError=require('./utils/appError')
const globalErrorHandler=require('./controllers/errorController')
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

/* middleware */
if (process.env.NODE_ENV === 'development') {

    app.use(morgan("dev"));
}


//middleware b/w req and res
app.use(express.json());

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


//all route handles which does not have any url defined
app.all('*',(req,res,next)=>{

    // res.status(404).json({
    //     status:'fail',
    //     message:`can't find ${req.originalUrl} on this server`
    // })

    // const err=new Error(`can't find ${req.originalUrl} on this server`)
    // err.status='fails'
    // err.statusCode=404

    next(new AppError(`can't find ${req.originalUrl} on this server`,404))

})

//error handling middleware
app.use(globalErrorHandler)


//start server

module.exports = app;