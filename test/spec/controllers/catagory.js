'use strict';

describe('Controller: CatagoryCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var CatagoryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CatagoryCtrl = $controller('CatagoryCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CatagoryCtrl.awesomeThings.length).toBe(3);
  });
});
