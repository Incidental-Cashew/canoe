// ADD LYFT FACTORY
angular.module('canoe.lyftServices', [])

.factory('Auth', function($http) {
  
  var getLyftToken = function() {
    return $http({
      url: 'https://api.lyft.com/oauth/token',
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        grant_type: 'client_credentials',
        scope: 'public'
      },
      params: {
        oauth_consumer_key: 'OTay-v3dc0Rf',
        oauth_signature: 'f0fQ_bPpm1XWC67I4c86NWok4U7jCizc%26'
      }
    }).then(function(res) {
      return res.access_token;
    });
  };
})

.factory('Details', function($http) {

  var getLyftEstimates = function(userData, token) {
    return $http({
      url: 'https://api.lyft.com/v1/cost',
      method: 'GET',
      headers: {
        Authorization: token
      },
      data: {
        start_lat: 37.773972,
        start_lng: -122.431297,
        end_lat: 37.2358, 
        end_lng: -121.9624 
      }
    }).then(function(res) {
        //RESPONSE
    });
  };

  var getLyftEta = function(userData, token) {
    return $http({
      url: 'https://api.lyft.com/v1/eta',
      method: 'GET',
      headers: {
        Authorization: token
      },
      data: {
        lat: 37.773972,
        lng: -122.431297
      }
    }).then(function(res) {
        //RESPONSE
    });
  };
});