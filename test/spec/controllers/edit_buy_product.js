'use strict';

describe('Controller: EditBuyProductCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var EditBuyProductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditBuyProductCtrl = $controller('EditBuyProductCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditBuyProductCtrl.awesomeThings.length).toBe(3);
  });
});
