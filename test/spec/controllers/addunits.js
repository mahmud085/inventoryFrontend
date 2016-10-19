'use strict';

describe('Controller: AddunitsCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var AddunitsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddunitsCtrl = $controller('AddunitsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddunitsCtrl.awesomeThings.length).toBe(3);
  });
});
