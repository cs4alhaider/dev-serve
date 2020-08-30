const fs = require("fs");
const lodash = require("lodash");
const express = require("express");
const helmet = require("helmet");
const yup = require("yup");
var {
  nanoid
} = require("nanoid");
const {
  nextTick
} = require("process");

require("dotenv").config();

const allServices = fs.readFileSync(__dirname + "/services-list.json", {
  encoding: "utf8",
  flag: "r",
});

const servicesModel = JSON.parse(allServices);

const app = express();

// Basic security
app.use(helmet());

// Only accept json data
app.use(express.json());

// public
app.use(express.static("./public"));

// Show all available services and test data
app.get("/all", (req, res) => {
  res.send(servicesModel);
});

app.get("/all/testData", (req, res) => {
  res.send(servicesModel.testData);
});

app.get("/all/services", (req, res) => {
  res.send(servicesModel.services);
});

// TODO: refactor
app.get("/all/services/:id", (req, res) => {
  const {
    id: service
  } = req.params;
  const object = lodash.find(
    servicesModel.services,
    (obj) => obj.id === parseInt(service)
  );
  if (!object) {
    res.status(404).json({
      error: `No service with ${id}`
    });
    return;
  }
  res.send(object);
});

const schema = yup.object().shape({
  id: yup.string().trim(),
  servicePath: yup
    .string()
    .trim()
    .matches(/[\w\-]/i)
    .required(),
  method: yup.string().trim().matches(/[\w]/i).required(),
});

app.post("/", async (req, res, next) => {
  let {
    id,
    servicePath,
    method
  } = req.body;
  try {
    await schema.validate({
      id,
      servicePath,
      method,
    });
    if (!id) {
      id = nanoid(12);
    }
    id = id.toLowerCase();
    res.json({
      id,
      servicePath,
      method,
    });
  } catch (error) {
    next(error);
  }
});

// Handling all errors by calling next(), I know I'm lazy 😬
app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === "PROD" ? "😣" : error.stack,
  });
});

// ================================================================ //

// MARK: Server
const port = process.env.PORT || 8080;

app.listen(port, () =>
  console.log(
    `|=========== App listening on http://localhost:${port} ===========|`
  )
); // --> http://localhost:8080/