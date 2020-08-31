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

function objectUsing(request) {
  const requestedPath = request.path;
  const object = lodash.find(
    servicesModel.services,
    (obj) => obj.servicePath === requestedPath
  );
  return object;
}

// Handle all other requests if there is no specific route
app.use((req, res) => {
  const obj = objectUsing(req);

  // check for object if not found
  if (!obj) {
    res.status(404).json({
      requestedPath: `${req.path}`,
      error: 'No available service',
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