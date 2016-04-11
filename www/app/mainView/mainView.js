angular.module('canoe.main', [])

.controller('MainCtrl', function($scope, UberDetails, UberAuth, Auth, Details) {

  //////////////////UBER DETAILS/////////////////////
  $scope.uberBearer;
  $scope.uberRefresh;

  UberAuth.getUberToken(getParameterByName('code')).then(function(token) {
    console.log(token);
    $scope.uberBearer = token.access_token;
    $scope.uberRefresh = token.refresh_token;
  });

  $scope.getUberPriceEstimates = UberDetails.getUberPriceEstimates;

  $scope.getUberTimeEstimates = function() {
    UberDetails.getUberTimeEstimates($scope.uberBearer).then(function(estimates) {
      // DO SOMETHING WITH TIME ESTIMATES
    });
  };

  $scope.getUserHistory = function() {
    UberDetails.getUserHistory($scope.uberBearer).then(function(history) {
      //do something with user history
    });
  };

  $scope.getNearbyRides = function() {
    UberDetails.getNearbyRides($scope.uberBearer).then(function(rides) {
      // do something with nearby rides
    });
  };
  ///////////////////////////////////////////////

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
