const express = require("express");
const configureMiddleware = require("./configure-middleware");

const server = express();

configureMiddleware(server);

module.exports = server;
