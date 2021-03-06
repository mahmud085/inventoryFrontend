'use strict';

describe('Controller: TransactionSellCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var TransactionSellCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TransactionSellCtrl = $controller('TransactionSellCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(TransactionSellCtrl.awesomeThings.length).toBe(3);
  });
});
