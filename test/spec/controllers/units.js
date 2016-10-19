'use strict';

describe('Controller: UnitsCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var UnitsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UnitsCtrl = $controller('UnitsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(UnitsCtrl.awesomeThings.length).toBe(3);
  });
});
