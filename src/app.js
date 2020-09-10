const express = require("express");
const helmet = require("helmet");

require("dotenv").config();

const app = express();

const data = require("./services-data/servicesModel");

// Basic security
app.use(helmet());

// Only accept json data
app.use(express.json());

app.get("/", (req, res) => {
  res.send(data)
})

app.get("/v1", (req, res) => {
  res.send(data)
})

// Show all available services
app.use("/v1/services", require("./route/services"));

app.use("/v1/testData", require("./route/testData"));

app.use(require("./route/main"));

// Handling all errors by calling next(), I know I'm lazy 😬
app.use(require("./route/error"));

// ================================================================ //

// MARK: Server
const port = process.env.PORT || 8080;

app.listen(port, () =>
  console.log(
    `|=========== 📻 App listening on http://localhost:${port} 📻 ===========|`
  )
); // --> http://localhost:8080/