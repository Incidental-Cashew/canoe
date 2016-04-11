// ADD LYFT FACTORY
angular.module('canoe.lyftServices', [])

.factory('LyftAuth', function($http, $window) {

  var postman = 'Basic T1RheS12M2RjMFJmOmYwZlFfYlBwbTFYV0M2N0k0Yzg2TldvazRVN2pDaXpj';

  var getLyftToken = function(authCode) {
    return $http({
      url: 'https://api.lyft.com/oauth/token',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: postman
      },
      data: {
        grant_type: 'authorization_code',
        code: authCode
      }
    }).then(function(res) {
      console.log(res.data.access_token);
      return res.data;
    });
  };

  return {getLyftToken: getLyftToken};
})

.factory('LyftDetails', function($http) {
  var getLyftDriversNearBy = function(userData, token) {
    return $http({
      method: 'GET',
      url: 'https://api.lyft.com/v1/drivers',
      method: 'GET',
      headers: {
        authorization: 'bearer ' + token
      },
      params: {
        lat: 37.783708,
        lng: -122.4177484
      }
    }).then(function(response){
      return response.data;
    });
  };

  var getLyftEstimates = function(bearer) {
    return $http({
      method: 'GET',
      url: 'https://api.lyft.com/v1/cost',
      headers: {
        Authorization: 'Bearer ' + bearer
      },
      params: {
        start_lat: 37.783708,
        start_lng: -122.4177484,
        end_lat: 37.711147,
        end_lng: -122.4507667
      }
    }).then(function(response) {
      return response.data;
    });
  };

  var getLyftEta = function(bearer) {
    return $http({
      method: 'GET',
      url: 'https://api.lyft.com/v1/eta',
      headers: {
        Authorization: 'Bearer ' + bearer
      },
      params: {
        lat: 37.783708,
        lng: -122.4177484
      }
    }).then(function(response) {
      return response.data;
    })
  };

  return {
    getLyftDriversNearBy: getLyftDriversNearBy,
    getLyftEta: getLyftEta,
    getLyftEstimates: getLyftEstimates,
  };
})

