module.exports = function(server, express) {
  server.get('/uberAuth', function(req, res) {
    res.redirect('https://login.uber.com/oauth/v2/authorize?client_id=mXeLa2XvUkhXEl8uTeqYTarmbP7aUmQy&response_type=code&redirect_uri=http://localhost:8000')
  });

  server.get('/lyftAuth', function(req, res) {
    res.redirect('https://api.lyft.com/oauth/authorize?client_id=XYarc8030gYN&response_type=code&scope=public+rides.read+offline+rides.request&state=http://localhost:8000')
  });

};