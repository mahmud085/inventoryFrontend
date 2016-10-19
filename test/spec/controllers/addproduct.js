'use strict';

describe('Controller: AddproductCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var AddproductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddproductCtrl = $controller('AddproductCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddproductCtrl.awesomeThings.length).toBe(3);
  });
});
