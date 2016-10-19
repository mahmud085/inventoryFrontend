'use strict';

describe('Controller: MoveProductCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var MoveProductCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MoveProductCtrl = $controller('MoveProductCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MoveProductCtrl.awesomeThings.length).toBe(3);
  });
});
