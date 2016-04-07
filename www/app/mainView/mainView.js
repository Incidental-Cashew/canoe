angular.module('canoe.main', [])

.controller('MainCtrl', function($scope) {

	$scope.testText = 'Compare realtime data between Uber and Lyft';
	$scope.getLyftDrivers = getLyftDriversNearBy().then(function(data){
		$scope.drivers = data.nearbydrivers.drivers.location;
	})
});
