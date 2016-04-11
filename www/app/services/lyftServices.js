// ADD LYFT FACTORY
angular.module('canoe.lyftServices', [])

.factory('LyftDetails', function($http) {

  var getLyftDriversNearBy = function(bearer) {
    return $http({
      method: 'GET',
      url: 'https://api.lyft.com/v1/drivers',
      headers: {
        Authorization: 'Bearer ' + bearer
      },
      params: {
        lat: 37.766249,
        lng: -122.418375
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
        start_lat: 37.773972,
        start_lng: -122.431297,
        end_lat: 37.2358,
        end_lng: -121.9624
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
        lat: 37.766249,
        lng: -122.418375
      }
    }).then(function(response) {
      return response.data;
    })
  };

  return {
    getLyftDriversNearBy: getLyftDriversNearBy,
    getLyftEstimates: getLyftEstimates,
    getLyftEta: getLyftEta
  }

})

.factory('LyftAuth', function($http, $window) {
  
  var getLyftToken = function(authCode) {
    console.log(authCode);
    return $http({
      method: 'POST',
      url: 'https://api.lyft.com/oauth/token',
      headers: {
        'Content_Type': 'application/json',
        // Authorization: 'Basic base64(XYarc8030gYN:9hjc6Jle563hgeSRCCSOuo993fy7EXFL)'
        Authorization: 'Basic WFlhcmM4MDMwZ1lOOjloamM2SmxlNTYzaGdlU1JDQ1NPdW85OTNmeTdFWEZM' //generated with clientid and clientsecret
      },
      data: {
        'grant_type': 'authorization_code',
        code: authCode
      }
    }).then(function(response) {
      console.log(JSON.stringify(response.data));
      return response.data;
    })
  };

  return {
    getLyftToken: getLyftToken
  }

});
