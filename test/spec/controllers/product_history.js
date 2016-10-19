'use strict';

describe('Controller: ProductHistoryCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var ProductHistoryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductHistoryCtrl = $controller('ProductHistoryCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ProductHistoryCtrl.awesomeThings.length).toBe(3);
  });
});
