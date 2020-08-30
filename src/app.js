const express = require("express");
const helmet = require("helmet");

require("dotenv").config();

const app = express();

// Basic security
app.use(helmet());

// Only accept json data
app.use(express.json());

// public
app.use(express.static("./public"));

// Show all available services and test data
app.use(require("./route/services"));

app.use(require("./route/main"));

// Handling all errors by calling next(), I know I'm lazy 😬
app.use(require("./route/error"));

// ================================================================ //

// MARK: Server
const port = process.env.PORT || 8080;

app.listen(port, () =>
  console.log(
    `|=========== App listening on http://localhost:${port} ===========|`
  )
); // --> http://localhost:8080/