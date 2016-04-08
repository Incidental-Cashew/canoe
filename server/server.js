var server = require('./config/server-config.js');

var port = 8000;

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  next();
};

server.use(allowCrossDomain);

server.listen(port, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log('Magic happening on ' + port);
});