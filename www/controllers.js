angular.module('canoe.controllers', ['ngMap'])

.filter('secondsToMinutes', [function() {
  return function(seconds) {
    var minutes = Math.floor((seconds / 60));
    return minutes + 'min';
  }
}])
.controller('ChatsCtrl', function($scope, NgMap) {

var options = {enableHighAccuracy: true};

// this will be used later
navigator.geolocation.getCurrentPosition(function(pos) {
                $scope.position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
                console.log(JSON.stringify($scope.position));
            },
            function(error) {
                alert('Unable to get location: ' + error.message);
            }, options);
})
.controller('DashCtrl', function($scope, LyftAuth, LyftDetails, UberDetails) {

    $scope.lyftEstimates;
    $scope.uberEstimates;

    // LYFT
    // Request token prior to making GET requests to Lyft API
    LyftAuth.getLyftToken().then(function(token) {

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
    UberDetails.getUberPriceEstimates(null).then(function(value) {
      $scope.uberEstimates = value.prices;
    });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
// controls the modal for setting a location/destination
.controller('ModalCtrl', function($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('./templates/searchModel.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    console.log('FIRE');
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });
});
