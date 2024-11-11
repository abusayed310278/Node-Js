const express = require("express");
const morgan = require("morgan");

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
app.use((req, res, next) => {
    console.log("middleare");
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

//route handlers

//routes

app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

//3rd party middleware named as morgan

//start server

module.exports = app;