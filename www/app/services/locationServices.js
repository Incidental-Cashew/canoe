angular.module('canoe.locationServices', ['ngMap', 'google.places'])

.factory('LocationDetails', function($rootScope, NgMap) {
  var service = {

    startLocation: null,
    position: null,
    endLocation: null,

    getStartLocation: function(callback) {
      navigator.geolocation.getCurrentPosition(function(pos) {
        var position = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        
        service.position = position;
        service.startLocation = JSON.stringify(position);
        callback();
      });
    },
    changeStartLocation: function(position, callback) {
      service.startLocation = JSON.stringify(position);
      callback();
    },
    getEndLocation: function(position, callback) {
      service.endLocation = JSON.stringify(position);
      callback();
    }
  };

  return service;
});
