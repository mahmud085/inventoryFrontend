'use strict';

describe('Controller: EditSellProductCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var EditSellProductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditSellProductCtrl = $controller('EditSellProductCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditSellProductCtrl.awesomeThings.length).toBe(3);
  });
});
