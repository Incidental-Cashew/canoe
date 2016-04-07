var express = require('express');

var server = express();

server.use(express.static(__dirname + '/client'));

module.exports = server;
