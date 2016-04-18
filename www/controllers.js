angular.module('canoe.controllers', ['ngMap', 'google.places'])

.filter('secondsToMinutes', [function() {
  return function(seconds) {
    var minutes = Math.floor((seconds / 60));
    return minutes + 'min';
  };
}])

.controller('ChatsCtrl', function($scope, NgMap, LocationDetails) {

  var geocoder = new google.maps.Geocoder;
  var options = {enableHighAccuracy: true};

  LocationDetails.getStartLocation(function() {
    geocoder.geocode({'location': LocationDetails.position}, function(result, status) {
      console.log('current location', LocationDetails.startLocation);
      $scope.geodecoded = result[0].formatted_address;
    });
  });

})

.controller('DashCtrl', function($scope, $window, $state, LyftAuth, LyftDetails, UberDetails, LocationDetails) {

  // USER AUTH COMMENTING OUT FOR TESTING
  // (function checkAuthenticated() {
  //   // check to see if $window.localStorage has both uberBearer and lyftBearer;
  //   if (!$window.localStorage.uberBearer || !$window.localStorage.lyftBearer) {
  //     $state.go('login');
  //   };
  // })();

  $scope.lyftEstimates;
  $scope.uberEstimates;
  $scope.startPosition;
  $scope.endPosition;

  $scope.selectedUber = {
    'background-color': 'black',
    'color': 'white'
  };

  $scope.selectedLyft = {
    'background-color': '#ff00cc',
    'color': 'white'
  };

  if (LocationDetails.startLocation && LocationDetails.endLocation) {
    $scope.startPosition = JSON.parse(LocationDetails.startLocation);
    $scope.endPosition = JSON.parse(LocationDetails.endLocation);

    console.log('DASH CONTROLLER');
    console.log('Start: ', $scope.startPosition);
    console.log('End: ', $scope.endPosition);

    // LYFT
    // Request token prior to making GET requests to Lyft API
    LyftAuth.getLyftToken().then(function(token) {

      LyftDetails.getLyftEstimates($scope.startPosition, $scope.endPosition, token.access_token).then(function(value) {
        $scope.lyftEstimates = value.cost_estimates;
      });

      LyftDetails.getLyftEta($scope.startPosition, token.access_token).then(function(value) {

        $scope.selectedLyft.ride = $scope.lyftEstimates[$scope.lyftEstimates.length - 1];
        // console.log(JSON.stringify($scope.selectedLyft.ride) + ' < -------- LYFT');

        // ADD ETA to Lyft Estimates
        $scope.lyftEstimates.forEach(function(ride, index) {
          ride.eta_seconds = value.eta_estimates[index].eta_seconds;
        });

      });

    });

    // UBER
    UberDetails.getUberPriceEstimates($scope.startPosition, $scope.endPosition).then(function(value) {
      $scope.uberEstimates = value.prices;

      UberDetails.getUberTimeEstimates($scope.startPosition, $scope.endPosition).then(function(value) {
        $scope.selectedUber.ride = $scope.uberEstimates[0];
        // console.log(JSON.stringify($scope.selectedUber.ride) + ' < ---- UBER ');

        $scope.uberEstimates.forEach(function(ride, index) {
          if (value.times[index]) {
            ride.eta_seconds = value.times[index].estimate;
          }
        });

      });

    });
  }

  $scope.requestUber = function() {
    UberDetails.requestUber($scope.startPosition, $scope.endPosition, $scope.selectedUber.ride.product_id, window.localStorage.uberBearer);
  };

  $scope.requestLyft = function() {
    console.log($scope.selectedLyft.ride);
    LyftDetails.requestLyft($scope.startPosition, $scope.endPosition, $scope.selectedLyft.ride.ride_type, window.localStorage.lyftBearer);
  };
  
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('ModalCtrl', function($scope, $ionicModal, LocationDetails) {
  $ionicModal.fromTemplateUrl('./templates/searchModel.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function(currentLocation) {
    $scope.currentLocation = currentLocation
    $scope.modal.show();
  };
  $scope.closeModal = function(currentLocation) {
    console.log(currentLocation);
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

  $scope.getStartLocation = function(location) {
    console.log('CHANGE START POSITION');
    LocationDetails.changeStartLocation(location, function() {
      console.log('from', LocationDetails.startLocation);
    });
  };

  $scope.getEndLocation = function(location) {
    console.log('CHANGE END POSITION');
    LocationDetails.getEndLocation(location, function() {
      console.log('to', LocationDetails.endLocation);
    });
  };
})

.controller('MainCtrl', function ($scope, $window, LocationDetails) {
  $scope.place = null;

  // $scope.getEndLocation = function(location) {
  //   LocationDetails.getEndLocation(location, function() {
  //     console.log(LocationDetails.endLocation);
  //   });
  // };

  function buildGooglePlacesResult(config) {
    // Build a synthetic google.maps.places.PlaceResult object
    return {
      formatted_address: config.address.street + ', ' + config.address.suburb + ', ' + config.address.state,
      address_components: [
        {
          long_name: config.address.street,
          short_name : config.address.street,
          types: [ 'route' ]
        },
        {
          long_name: config.address.suburb,
          short_name: config.address.suburb,
          types: [ 'locality' ]
        },
        {
          long_name: config.address.state,
          short_name: config.address.state,
          types: [ 'administrative_area_level_1' ]
        }
    ],
    geometry: {
        location: {
          lat: function () { return config.location.latitude },
          lng: function () { return config.location.longitude }
        }
      }
    };
  }
})

.controller('LoginCtrl', function($scope, $window, $state, UberAuth, LyftAuth) {
  $window.uberAuthenticated = false;
  $window.lyftAuthenticated = false;

  $scope.uberAuthenticated = !!$window.localStorage.uberBearer;
  $scope.lyftAuthenticated = !!$window.localStorage.lyftBearer;

  UberAuth.getUberToken(getParameterByName('code')).then(function(token) {
    // $scope.uberBearer = token.access_token;
    // $scope.uberRefresh = token.refresh_token;
    $window.localStorage.uberBearer = token.access_token;
    $scope.uberAuthenticated = true;
    checkAuthenticated();
  });

  LyftAuth.getUserLyftToken(getParameterByName('code')).then(function(token) {
    $scope.lyftBearer = token.access_token;
    $scope.lyftRefresh = token.refresh_token;
    $window.localStorage.lyftBearer = $scope.lyftBearer;
    $scope.lyftAuthenticated = true;
    checkAuthenticated();
  });

  // Get value of parameters in url
  function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
  };

  function checkAuthenticated() {
    // check to see if $window.localStorage has both uberBearer and lyftBearer;
    if ($window.localStorage.uberBearer && $window.localStorage.lyftBearer) {
      $state.go('map');
    };
  };
  checkAuthenticated();


});
