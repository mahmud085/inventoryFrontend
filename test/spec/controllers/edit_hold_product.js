'use strict';

describe('Controller: EditHoldProductCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var EditHoldProductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditHoldProductCtrl = $controller('EditHoldProductCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditHoldProductCtrl.awesomeThings.length).toBe(3);
  });
});
