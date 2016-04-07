
.factory('Details', function($http){
  var getLyftDriversNearBy = function(userData, token) {
    return $http({
      url: 'https://api.lyft.com/v1/drivers?api_key=XzxEdIUxTPmwORmVdy4V4jvseD3vvTBy',
      method: GET,
      headers: {
        Authorization: token
      }
      data: {
        Authorization:token,
        lat: 37.773550,
        lng: -122.421264,
      }
    }).then(function(response){
      return response;

    });
  };
});
