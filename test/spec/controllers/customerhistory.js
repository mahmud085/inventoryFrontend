'use strict';

describe('Controller: CustomerhistoryCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var CustomerhistoryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CustomerhistoryCtrl = $controller('CustomerhistoryCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CustomerhistoryCtrl.awesomeThings.length).toBe(3);
  });
});
