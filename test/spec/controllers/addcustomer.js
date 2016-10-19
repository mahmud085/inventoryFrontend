'use strict';

describe('Controller: AddcustomerCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var AddcustomerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddcustomerCtrl = $controller('AddcustomerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddcustomerCtrl.awesomeThings.length).toBe(3);
  });
});
