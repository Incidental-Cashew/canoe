angular.module('canoe.main', [])

.controller('MainCtrl', function($scope, UberDetails, UberAuth, LyftDetails, LyftAuth) {

  Auth.getLyftToken().then(function(token) {
    // $scope.token = token.access_token;
    var estimates = Details.getLyftEstimates(null, token.access_token);
    console.log(estimates);
    console.log(Details.getLyftEta(null, token.access_token));
    // console.log(Details.getLyftDriversNearBy(null, token.access_token));
  	$scope.testText = 'Compare realtime data between Uber and Lyft';

    //////////////////UBER DETAILS/////////////////////
    $scope.uberBearer;
    $scope.uberRefresh;

    UberAuth.getUberToken(getParameterByName('code')).then(function(token) {
      console.log(token);
      $scope.uberBearer = token.access_token;
      $scope.uberRefresh = token.refresh_token;
    });
    lyftServices.getLyftDriversNearBy().then(function(data){
      $scope.drivers = data.nearbydrivers.drivers.location;


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


    /////////////////LYFT DETAILS///////////////////
    $scope.lyftBearer;
    $scope.lyftRefresh;

    LyftAuth.getLyftToken(getParameterByName('code')).then(function(token) {
      $scope.lyftBearer = token.access_token;
      $scope.lyftRefresh = token.refresh_token;
    });
    console.log($scope.lyftBearer + ' < ------------ lyftBearer');

    $scope.getNearbyLyftDrivers = function() {
      LyftDetails.getLyftDriversNearBy($scope.lyftBearer).then(function(drivers) {
        console.log(drivers);
        //do stuff with nearby drivers
      });
    };

    $scope.getLyftEstimates = function() {
      LyftDetails.getLyftEstimates($scope.lyftBearer).then(function(estimates) {
        console.log(estimates);
        //do stuff with estimates
      });
    };

    $scope.getLyftEta = function() {
      LyftDetails.getLyftEta($scope.lyftBearer).then(function(eta) {
        console.log(eta);
        //do stuff with eta
      });
    };
    ////////////////////////////////////////////////
  });
});
