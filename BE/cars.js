const Joi = require("joi");
const express = require("express");
const cors = require("cors");
const app = express();

const router = express.Router();
const uuidv1 = require("uuid/v1");
const Car = require("./models/car");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
mongoose.connect("mongodb://localhost/mDB");
mongoose.connection
  .once("open", function() {
    console.log("Connection has ben made!!!!!");
  })
  .on("error", function(error) {
    console.log("Conncetion error:", error);
  });

app.use(bodyParser.json());
app.use(cors());

const port = 3001;
app.listen(port, () => console.log("listenning on port 3001..."));

function validateVeh(car) {
  const schema = {
    carName: Joi.string().required(),
    type: Joi.string()
      .valid("Truck", "Hybrid", "SUV")
      .required(),
    lastCon: Joi.date().required()
  };
  return Joi.validate(car, schema);
}

//GET
app.get("/api/cars", (req, res) => {
  Car.find()
    .exec()
    .then(cars => {
      res.status(200).json({ cars });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//POST
app.post("/api/cars", (req, res) => {
  const { error } = validateVeh(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const car = new Car({
    _id: new mongoose.Types.ObjectId(),
    id: uuidv1(),
    carName: req.body.carName,
    timeCreated: new Date().toDateString() + " - " + new Date().toTimeString(),
    type: req.body.type,
    lastCon: req.body.lastCon
  });
  car
    .save()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch(err => {
      console.log("err: ", err);
      res.status(500).json({
        error: err
      });
    });
});

//DELETE
app.delete("/api/cars/:id", (req, res, next) => {
  const id = req.params.id;
  Car.remove({ _id: id })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

//PUT
app.put("/api/cars/:id", (req, res, next) => {
  const body = req.body || {};
  const id = req.params.id;
  const updateOps = {};
  for (const ops of Object.keys(body)) {
    updateOps[ops] = body[ops];
  }
  Car.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
