angular.module('canoe.uberServices', [])

.factory('Details', function($http) {

	var getUberEstimates = function(userData) {
		return $http({
			url: 'https://api.uber.com/v1/estimates/price',
			data: {
				server_token: 'SERVERTOKEN',
				start_latitude: 37.773972, //userData.startLat
				start_longitude: -122.431297, //userData.startLong
				end_latitude: 37.2358, //userData.endLat
				end_longitude: -121.9624 //userData.endLong
			}
		}).then(function(res) {
			//RESPONSE
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
	}
});