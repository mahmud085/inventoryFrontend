'use strict';

describe('Controller: InventoryHoldReturnCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var InventoryHoldReturnCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InventoryHoldReturnCtrl = $controller('InventoryHoldReturnCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InventoryHoldReturnCtrl.awesomeThings.length).toBe(3);
  });
});
