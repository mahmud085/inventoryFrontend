'use strict';

describe('Controller: SalesagentHistoryCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var SalesagentHistoryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SalesagentHistoryCtrl = $controller('SalesagentHistoryCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SalesagentHistoryCtrl.awesomeThings.length).toBe(3);
  });
});
