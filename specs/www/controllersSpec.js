'use strict';

describe('AllControllers', function () {
  var $scope, $rootScope, createController, LocationDetails, LyftDetails, UberDetails, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('canoe'));
  beforeEach(inject(function ($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    i// $httpBackend = $injector.get('$httpBackend');
    LocationDetails = $injector.get('LocationDetails');
    LyftDetails = $injector.get('LyftDetails');
    UberDetails = $injector.get('UberDetails');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('DashCtrl', {
        $scope: $scope,
        LyftDetails: LyftDetails,
        UberDetails: UberDetails
      });
    };

  }));

  it('should have a data property on the $scope', function () {
    createController();
    expect($scope.data).to.be.an('object');
  });

//  it('should call `Links.getAll()` when controller is loaded', function () {
//    sinon.spy(Links, 'getAll');
//    $httpBackend.expectGET('/api/links').respond(200);
//
//    createController();
//    $httpBackend.flush();
//
//    expect(Links.getAll.called).to.equal(true);
//    Links.getAll.restore();
//  });
//
//  it('should populate the data property after the call to `Links.getAll()`', function () {
//    var mockLinks = [{}, {}, {}];
//    $httpBackend.expectGET('/api/links').respond(mockLinks);
//
//    createController();
//    $httpBackend.flush();
//
//    expect($scope.data.links).to.deep.equal(mockLinks);
//  });
});
