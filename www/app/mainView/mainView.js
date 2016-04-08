angular.module('canoe.main', [])

.controller('MainCtrl', function($scope, Auth, Details) {

  Auth.getLyftToken().then(function(token) {
    // $scope.token = token.access_token;
    console.log(Details.getLyftEstimates(null, token.access_token));
    console.log(Details.getLyftEta(null, token.access_token));
    // console.log(Details.getLyftDriversNearBy(null, token.access_token));
  });

	$scope.testText = 'Compare realtime data between Uber and Lyft';
	// $scope.getLyftDrivers = getLyftDriversNearBy().then(function(data){
	// 	$scope.drivers = data.nearbydrivers.drivers.location;
	// })
});
