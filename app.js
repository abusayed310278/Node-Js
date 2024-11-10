const fs = require("fs");
const express = require("express");
const morgan=require('morgan')


const app = express();

/* middleware */
app.use(morgan('dev'))

//middleware b/w req and res
app.use(express.json());

//middleware order matters
app.use((req,res,next)=>{
    console.log('middleare')
    next()
})

app.use((req,res,next)=>{
    req.requestTime=new Date().toISOString();
    next()
})

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//route handlers
const getAllTours = (req, res) => {

  console.log(req.requestTime) 
  
  res.status(200).json({
    status: "success",
    requestedAt:req.requestTime,
    results: tours.length,
    data: { tours },
  });

}

const createTour = (req, res) => {


  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: { tour: newTour },
      });
    }
  );
}

const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1; //convert any string to number

  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "invalid id",
    });
  }

  res.status(200).json({
    status: "success",
    data: { tour },
  });
}

const updateTour = (req, res) => {

  if (req.params * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "invalid id",
    });
  }

  res.status(200).json({
    status: "success",
    data: { tour: "<updated tour>" },
  });
}

const deleteTour = (req, res) => {
  if (req.params * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "invalid id",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
}

const getAllUsers=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'this route is not yet defined'
    })
}

const createUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'this route is not yet defined'
    })
}

const getUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'this route is not yet defined'
    })
}

const updateUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'this route is not yet defined'
    })
}

const deleteUser=(req,res)=>{
    res.status(500).json({
        status:'error',
        message:'this route is not yet defined'
    })
}

//routes

const tourRouter=express.Router();
const userRouter=express.Router();
app.use('/api/v1/tours',tourRouter)
app.use('/api/v1/users',userRouter)

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

//3rd party middleware named as morgan
userRouter.route('/').get(getAllUsers).post(createUser)
userRouter.route('/:id').get(getUser).post(updateUser).delete(deleteUser)




//start server

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port at ${port}....`);
});
