var express = require('express');

var server = express();

server.use(express.static(__dirname + '/../../www'));

module.exports = server;
