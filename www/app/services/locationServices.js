angular.module('canoe.locationServices', ['ngMap', 'google.places'])

.factory('LocationDetails', function($rootScope, NgMap) {
  var service = {

    startLocation: null,
    position: null,

    getStartLocation: function(callback) {
      navigator.geolocation.getCurrentPosition(function(pos) {
        var position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        
        service.position = position;
        service.startLocation = JSON.stringify(position);
        // console.log('FROM SERVICE', service.startlocation);
        $rootScope.$broadcast( 'location.update' );
        callback();
      });
    }
  };

  return service;
});
