'use strict';

describe('Controller: AddsaleagentCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var AddsaleagentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddsaleagentCtrl = $controller('AddsaleagentCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddsaleagentCtrl.awesomeThings.length).toBe(3);
  });
});
