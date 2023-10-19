const config = require("./utils/config");
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const candidatesRouter = require("./controllers/candidates");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware");
require("express-async-errors");

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(middleware.tokenExtractor);
app.use(middleware.errorHandler);

app.use(cors());

app.use(express.json());

app.use("/api/candidates", candidatesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/uploads", express.static("uploads"));

// serve static react site

app.use(express.static("build"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = app;
