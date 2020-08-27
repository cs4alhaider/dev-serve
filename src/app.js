const fs = require("fs");
const lodash = require("lodash");
const app = require("express")();

const allServices = fs.readFileSync(__dirname + "/services-list.json", {
  encoding: "utf8",
  flag: "r",
});

const servicesModel = JSON.parse(allServices);

// Show all available services and test data
app.get("/", (req, res) => {
  res.send(servicesModel);
});

// ================================================================ //

// MARK: Server
const port = process.env.port || 8080;

app.listen(port, () =>
  console.log(
    `|=========== App listening on http://localhost:${port} ===========|`
  )
); // --> http://localhost:8080/
