const fs = require("fs");

const allServices = fs.readFileSync(__dirname + "/services-list.json", {
    encoding: "utf8",
    flag: "r",
});

module.exports = JSON.parse(allServices);