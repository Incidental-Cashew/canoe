angular.module('canoe.uberServices', [])

.factory('UberDetails', function($http) {

  var getUberPriceEstimates = function(startData) {
    return $http({
      method: 'GET',      
      url: 'https://api.uber.com/v1/estimates/price',
      Authorization: 'Token 4SETeVarXmqjMneX0W7AlGgwjDmKuku7K7A6Ydqg',
      params: {
        server_token: '4SETeVarXmqjMneX0W7AlGgwjDmKuku7K7A6Ydqg',
        start_latitude: startData.lat, //userData.startLat
        start_longitude: startData.lng, //userData.startLong
        end_latitude: 37.711147, //userData.endLat
        end_longitude: -122.4507667 //userData.endLong
      }
    }).then(function(res) {
      // do something with response
      // console.log(JSON.stringify(res.data));
      return res.data;
    });
  };

  // var getUberPriceEstimates = function(userData) {
  //   return $http({
  //     method: 'GET',      
  //     url: 'https://api.uber.com/v1/estimates/price',
  //     Authorization: 'Token 4SETeVarXmqjMneX0W7AlGgwjDmKuku7K7A6Ydqg',
  //     params: {
  //       server_token: '4SETeVarXmqjMneX0W7AlGgwjDmKuku7K7A6Ydqg',
  //       start_latitude: 37.783708, //userData.startLat
  //       start_longitude: -122.4177484, //userData.startLong
  //       end_latitude: 37.711147, //userData.endLat
  //       end_longitude: -122.4507667 //userData.endLong
  //     }
  //   }).then(function(res) {
  //     // do something with response
  //     // console.log(JSON.stringify(res.data));
  //     return res.data;
  //   });
  // };

  var getUberTimeEstimates = function(startData, bearer) {
    return $http({
      method: 'GET',
      url: 'https://api.uber.com/v1/estimates/time',
      params: {
        server_token: '4SETeVarXmqjMneX0W7AlGgwjDmKuku7K7A6Ydqg',
        start_latitude: startData.lat, //userData.startLat
        start_longitude: startData.lng, //userData.startLong
        end_latitude: 37.711147, //userData.endLat
        end_longitude: -122.4507667 //userData.endLong
      }
    }).then(function(res) {
      // console.log(JSON.stringify(res.data));
      return res.data;
    });
  };

  // var getUberTimeEstimates = function(userData, bearer) {
  //   return $http({
  //     method: 'GET',
  //     url: 'https://api.uber.com/v1/estimates/time',
  //     params: {
  //       server_token: '4SETeVarXmqjMneX0W7AlGgwjDmKuku7K7A6Ydqg',
  //       start_latitude: 37.783708, //userData.startLat
  //       start_longitude: -122.4177484, //userData.startLong
  //       end_latitude: 37.711147, //userData.endLat
  //       end_longitude: -122.4507667 //userData.endLong
  //     }
  //   }).then(function(res) {
  //     // console.log(JSON.stringify(res.data));
  //     return res.data;
  //   });
  // };


  var getNearbyRides = function(bearer) {
    return $http({
      method: 'POST',
      url: 'https://api.uber.com/v1/requests/estimate', //SANDBOX: https://sandbox-api.uber.com//v1/sandbox/requests/
      headers: {
        Authorization: 'Bearer ' + bearer,
        'Content-type': 'application/json'
      },
      data: {
        start_latitude: 37.783708, //userData.startLat
        start_longitude: -122.4177484, //userData.startLong
        end_latitude: 37.711147, //userData.endLat
        end_longitude: -122.4507667 //userData.endLong
      }
    }).then(function(res) {
      // console.log(JSON.stringify(res));
      return res;
    });
  };

  // don't need to get user's history, just testing the bearer token
  var getUserHistory = function(bearer) {
    return $http({
      method: 'GET',
      url: 'https://api.uber.com/v1.2/history',
      headers: {
        Authorization: 'Bearer ' + bearer,
        'Content-type': 'application/json'
      }
    }).then(function(res) {
      // console.log(JSON.stringify(res));
    });
  };

  return {
    getUberPriceEstimates: getUberPriceEstimates,
    getNearbyRides: getNearbyRides,
    getUberTimeEstimates: getUberTimeEstimates,
    getUserHistory: getUserHistory
  }

})

.factory('UberAuth', function($http, $location) {

  // currently serves no function, was testing redirects, may be useful later
  var authenticate = function() {
    return $http({
      method: 'GET',
      url: 'https://login.uber.com/oauth/v2/authorize?client_id=mXeLa2XvUkhXEl8uTeqYTarmbP7aUmQy&response_type=code&redirect_uri=http://localhost:8000',
    }).then(function(res) {
      console.log(res);
      // return res.data;
    })
  };

  // currently serves no function, was testing redirects, may be useful later
  var redirect = function() {
    return $http({
      method: 'GET',
      url: '/uberAuth'
    }).then(function(res) {
      $location.path('/uberAuth');
    })
  };


  var getUberToken = function(authCode) {
    //client_secret: 'JUNTb5H7EVlifUuHkpP3XJpyZvCnfsUQvgaJllvG',
    //client_id: 'mXeLa2XvUkhXEl8uTeqYTarmbP7aUmQy',
    //grant_type: '4SETeVarXmqjMneX0W7AlGgwjDmKuku7K7A6Ydqg'
    console.log(authCode);
    return $http({
      method: 'POST',
      url: 'https://login.uber.com/oauth/v2/token',
      params: {
        client_secret: 'JUNTb5H7EVlifUuHkpP3XJpyZvCnfsUQvgaJllvG',
        client_id: 'mXeLa2XvUkhXEl8uTeqYTarmbP7aUmQy',
        grant_type: 'authorization_code',
        redirect_uri: 'http://localhost:8100',
        code: authCode,
      }
    }).then(function(res) {
      console.log(JSON.stringify(res.data));
      return res.data;
    });
  };

  return {
    authenticate: authenticate,
    redirect: redirect,
    getUberToken: getUberToken
  }
});
