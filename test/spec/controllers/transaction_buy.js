'use strict';

describe('Controller: TransactionBuyCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var TransactionBuyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransactionBuyCtrl = $controller('TransactionBuyCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TransactionBuyCtrl.awesomeThings.length).toBe(3);
  });
});
