const fs = require("fs");
const express = require("express");
const app = express();

//middleware b/w req and res
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);


const getAllTours = (req, res) => {

  res.status(200).json({
    status: "success",
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



app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);




const port = 3000;
app.listen(port, () => {
  console.log(`app running on port at ${port}....`);
});
