const router = require("express").Router();

const servicesModel = require("../services-data/servicesModel");

const getObject = (head, req, res) => {
  const {
    id: id
  } = req.params;
  const object = head.find(obj => obj.id === parseInt(id));
  if (!object)
    res.status(404).json({
      error: `No data found with id: ${id}`,
    });
  else
    res.send(object);
}

const getObjectForRequestedPath = (request) => {
  const requestedPath = request.path;
  const object = servicesModel.services.find(obj => obj.servicePath === requestedPath);
  return object;
}

// MARK: Services
router.get("/", (req, res) => {
  res.send(servicesModel.services);
});

router.get("/:id", (req, res) => {
  getObject(servicesModel.services, req, res);
});

// Handle all other requests if there is no specific route
router.use((req, res) => {
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

module.exports = router;