angular.module('canoe.uberServices', [])

.factory('UberDetails', function($http) {

  var getUberEstimates = function(userData) {
    return $http({
      url: 'https://api.uber.com/v1/estimates/price',
      params: {
        'server_token': '4SETeVarXmqjMneX0W7AlGgwjDmKuku7K7A6Ydqg',
        'start_latitude': 37.783708, //userData.startLat
        'start_longitude': -122.4177484, //userData.startLong
        'end_latitude': 37.711147, //userData.endLat
        'end_longitude': -122.4507667 //userData.endLong
      }
    }).then(function(res) {
      return res.data;
    });
  };

  var getNearbyRides = function() {
    return $http({
      method: 'POST',
      url: 'https://api.uber.com/v1/requests', //SANDBOX: https://sandbox-api.uber.com//v1/sandbox/requests/
      data: {

      }
    });

  };

  return {
    getUberEstimates: getUberEstimates
  };
});