'use strict';

describe('Controller: SuppliersCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var SuppliersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SuppliersCtrl = $controller('SuppliersCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SuppliersCtrl.awesomeThings.length).toBe(3);
  });
});
