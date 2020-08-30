const app = require('express')();
const yup = require("yup");
var {
    nanoid
} = require("nanoid");

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

module.exports = app;