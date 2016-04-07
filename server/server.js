var server = require('./config/server-config.js');

var port = 8000;

server.listen(port, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('Magic happening on ' + port);
});