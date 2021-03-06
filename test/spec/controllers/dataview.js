'use strict';

describe('Controller: DataviewCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var DataviewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DataviewCtrl = $controller('DataviewCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DataviewCtrl.awesomeThings.length).toBe(3);
  });
});
