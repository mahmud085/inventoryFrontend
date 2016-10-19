'use strict';

describe('Controller: SalesagentCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var SalesagentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SalesagentCtrl = $controller('SalesagentCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SalesagentCtrl.awesomeThings.length).toBe(3);
  });
});
