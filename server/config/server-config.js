var express = require('express');
var mongoose = require('mongoose');

var server = express();

mongoose.connect('mongodb://localhost/canoe');

server.use(express.static(__dirname + '/../../client'));

module.exports = server;
