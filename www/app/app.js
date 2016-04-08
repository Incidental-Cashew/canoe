angular.module('canoe', [
  'base64',
  'canoe.lyftServices',
  // 'canoe.uberServices',
  'canoe.main',
  'ngRoute'
])

.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'app/mainView/mainView.html',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});