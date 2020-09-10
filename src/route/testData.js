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

// MARK: Test Data
router.get("/", (req, res) => {
    res.send(servicesModel.testData);
});

// TODO: router.post to add new testData
router.post("/", (req, res) => {
    res.send("TODO");
});

// TODO: router.patch to add new testData
router.patch("/", (req, res) => {
    res.send("TODO");
});

// TODO: router.delete to add new testData
router.delete("/", (req, res) => {
    res.send("TODO");
});

router.get("/staging", (req, res) => {
    res.send(servicesModel.testData.filter(obj => obj.env.includes("staging")))
});

router.get("/staging/:id", (req, res) => {
    getObject(servicesModel.testData.filter(obj => obj.env.includes("staging")), req, res)
});

router.get("/production", (req, res) => {
    res.send(servicesModel.testData.filter(obj => obj.env.includes("production")))
});

router.get("/production/:id", (req, res) => {
    getObject(servicesModel.testData.filter(obj => obj.env.includes("production")), req, res)
});

module.exports = router;