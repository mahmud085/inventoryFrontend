'use strict';

describe('Controller: InventoryHoldCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var InventoryHoldCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InventoryHoldCtrl = $controller('InventoryHoldCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InventoryHoldCtrl.awesomeThings.length).toBe(3);
  });
});