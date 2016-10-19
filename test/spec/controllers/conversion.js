'use strict';

describe('Controller: ConversionCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var ConversionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConversionCtrl = $controller('ConversionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConversionCtrl.awesomeThings.length).toBe(3);
  });
});
