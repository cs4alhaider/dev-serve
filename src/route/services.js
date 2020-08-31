const app = require("express")();
const lodash = require("lodash");

const servicesModel = require("../services-data/servicesModel");

const getObject = (head, req, res) => {
  const {
    id: id
  } = req.params;
  const object = lodash.find(head, (obj) => obj.id === parseInt(id));
  if (!object)
    res.status(404).json({
      error: `No data found with id: ${id}`,
    });
  else
    res.send(object);
}

const getObjectForRequestedPath = (request) => {
  const requestedPath = request.path;
  const object = lodash.find(
    servicesModel.services,
    (obj) => obj.servicePath === requestedPath
  );
  return object;
}

// MARK: All Data
app.get("/", (req, res) => {
  res.send(servicesModel);
});

// MARK: Test Data
app.get("/testData", (req, res) => {
  res.send(servicesModel.testData);
});

app.get("/testData/staging/:id", (req, res) => {
  getObject(servicesModel.testData.staging, req, res)
});

// MARK: Services
app.get("/services", (req, res) => {
  res.send(servicesModel.services);
});

app.get("/services/:id", (req, res) => {
  getObject(servicesModel.services, req, res);
});

// Handle all other requests if there is no specific route
app.use((req, res) => {
  const obj = getObjectForRequestedPath(req);
  // check for object if not found
  if (!obj) {
    res.status(404).json({
      requestedPath: `${req.path}`,
      error: 'No service available for requested path 😟',
    });
    return;
  }
  if (req.method == obj.method) {
    res.sendFile(obj.filePath, {
      root: "../src",
    });
  } else {
    res.status(405).json({
      error: "405 Method Not Allowed",
    });
  }
});

module.exports = app;