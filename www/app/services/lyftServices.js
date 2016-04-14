// ADD LYFT FACTORY
angular.module('canoe.lyftServices', [])

.factory('LyftAuth', function($http, $window) {

  var postman = 'Basic T1RheS12M2RjMFJmOmYwZlFfYlBwbTFYV0M2N0k0Yzg2TldvazRVN2pDaXpj';

  var getLyftToken = function() {
    return $http({
      url: 'https://api.lyft.com/oauth/token',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: postman
      },
      data: {
        grant_type: 'client_credentials',
        scope: 'public'
      }
    }).then(function(res) {
      console.log('TOKEN: ', res.data.access_token);
      return res.data;
    });
  };  

  var getUserLyftToken = function(authCode) {
    return $http({
      url: 'https://api.lyft.com/oauth/token',
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: 'Basic WFlhcmM4MDMwZ1lOOjloamM2SmxlNTYzaGdlU1JDQ1NPdW85OTNmeTdFWEZM'
      },
      data: {
        grant_type: 'authorization_code',
        code: authCode
      }
    }).then(function(res) {
      console.log('TOKEN: ', res.data.access_token);
      return res.data;
    });
  };


  return {
    getLyftToken: getLyftToken,
    getUserLyftToken: getUserLyftToken
  };
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

  // var getLyftEstimates = function(userData, token) {
  //   return $http({
  //     method: 'GET',
  //     url: 'https://api.lyft.com/v1/cost',
  //     headers: {
  //       authorization: 'bearer ' + token
  //     },
  //     params: {
  //       start_lat: 37.783708,
  //       start_lng: -122.4177484,
  //       end_lat: 37.711147,
  //       end_lng: -122.4507667
  //     }
  //   }).then(function(response) {
  //     return response.data;
  //   });
  // };
  var getLyftEstimates = function(startData, token) {
    return $http({
      method: 'GET',
      url: 'https://api.lyft.com/v1/cost',
      headers: {
        authorization: 'bearer ' + token
      },
      params: {
        start_lat: startData.lat,
        start_lng: startData.lng,
        end_lat: 37.711147,
        end_lng: -122.4507667
      }
    }).then(function(response) {
      return response.data;
    });
  };

  // var getLyftEta = function(userData, token) {
  //   return $http({
  //     method: 'GET',
  //     url: 'https://api.lyft.com/v1/eta',
  //     headers: {
  //       authorization: 'bearer ' + token
  //     },
  //     params: {
  //       lat: 37.783708,
  //       lng: -122.4177484
  //     }
  //   }).then(function(response) {
  //     return response.data;
  //   })
  // };
  var getLyftEta = function(startData, token) {
    return $http({
      method: 'GET',
      url: 'https://api.lyft.com/v1/eta',
      headers: {
        authorization: 'bearer ' + token
      },
      params: {
        lat: startData.lat,
        lng: startData.lng
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

