angular.module('canoe.controllers', [])

.filter('secondsToMinutes', [function() {
  return function(seconds) {
    var minutes = Math.floor((seconds / 60));
    return minutes + 'min';
  }
}])

.controller('DashCtrl', function($scope, Auth, LyftDetails, UberDetails) {

    $scope.lyftEstimates;
    $scope.uberEstimates;

    // LYFT
    // Request token prior to making GET requests to Lyft API
    Auth.getLyftToken().then(function(token) {

      LyftDetails.getLyftEstimates(null, token.access_token).then(function(value) {
        console.log(value.cost_estimates);
        $scope.lyftEstimates = value.cost_estimates;
      });

      LyftDetails.getLyftEta(null, token.access_token).then(function(value) {
        console.log(value.eta_estimates);

        // ADD ETA to Lyft Estimates
        $scope.lyftEstimates.forEach(function(ride, index) {
          ride.eta_seconds = value.eta_estimates[index].eta_seconds;
        });
      });
    });

    // UBER
    UberDetails.getUberEstimates(null).then(function(value) {
      $scope.uberEstimates = value.prices;
    });
})

.controller('ChatsCtrl', function($scope, Chats, $cordovaGeolocation, NgMap) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  NgMap.getMap().then(function(map) {
   console.log(map.getCenter());
   console.log('markers', map.markers);
   console.log('shapes', map.shapes);
 });

 NavigatorGeolocation.getCurrentPosition()
  .then(function(position) {
    var lat = position.coords.latitude, lng = position.coords.longitude;
    //TODO: add this into map by default
  })
  var options = {timeout: 10000, enableHighAccuracy: true};
  $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };



  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
