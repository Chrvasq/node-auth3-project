const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const apiRouter = require("./api-router");

module.exports = server => {
  server.use(express.json());
  server.use(helmet());
  server.use(cors());
  server.use("/api", apiRouter);
};
