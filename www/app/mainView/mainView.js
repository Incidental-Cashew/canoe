angular.module('canoe.main', [])

.controller('MainCtrl', function($scope, Auth, Details, lyftServices) {

  Auth.getLyftToken().then(function(token) {
    // $scope.token = token.access_token;
    var estimates = Details.getLyftEstimates(null, token.access_token);
    console.log(estimates);
    console.log(Details.getLyftEta(null, token.access_token));
    // console.log(Details.getLyftDriversNearBy(null, token.access_token));
  });
  lyftServices.getLyftDriversNearBy().then(function(data){
    $scope.drivers = data.nearbydrivers.drivers.location;


  });
});
