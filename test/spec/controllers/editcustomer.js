'use strict';

describe('Controller: EditcustomerCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var EditcustomerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditcustomerCtrl = $controller('EditcustomerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditcustomerCtrl.awesomeThings.length).toBe(3);
  });
});
