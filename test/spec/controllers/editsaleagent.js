'use strict';

describe('Controller: EditsaleagentCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var EditsaleagentCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditsaleagentCtrl = $controller('EditsaleagentCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditsaleagentCtrl.awesomeThings.length).toBe(3);
  });
});
