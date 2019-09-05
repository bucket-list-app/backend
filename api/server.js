const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
	res.json({ message: "Its Alive!" });
});

module.exports = server;
