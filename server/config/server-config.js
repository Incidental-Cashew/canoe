var express = require('express');
var mongoose = require('mongoose');

var server = express();

server.use(express.static(__dirname + '/../../www'));
mongoose.connect('mongodb://localhost/canoe');

module.exports = server;
