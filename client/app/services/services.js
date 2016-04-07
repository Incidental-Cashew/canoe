angular.module('MODULENAME', [])

.factory('Details', function($http) {

	var getUberEstimates = function(userData) {
		return $http({
			url: 'https://api.uber.com/v1/estimates/price',
			params: {
				server_token: 'SERVERTOKEN',
				start_latitude: 37.773972, //userData.startLat
				start_longitude: -122.431297, //userData.startLong
				end_latitude: 37.2358, //userData.endLat
				end_longitude: 121.9624 //userData.endLong
			}
		}).then(function(res) {
			//RESPONSE
		});
	};

	return {
		getUberEstimates: getUberEstimates
	}
});