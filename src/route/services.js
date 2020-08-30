const app = require("express")();
const lodash = require("lodash");

const servicesModel = require("../services-data/servicesModel");

app.get("/all", (req, res) => {
  res.send(servicesModel);
});

app.get("/all/testData", (req, res) => {
  res.send(servicesModel.testData);
});

app.get("/all/services", (req, res) => {
  res.send(servicesModel.services);
});

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
      error: `No service with ${id}`,
    });
    return;
  }
  res.send(object);
});

module.exports = app;