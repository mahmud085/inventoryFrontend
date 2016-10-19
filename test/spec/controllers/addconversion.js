'use strict';

describe('Controller: AddconversionCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var AddconversionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddconversionCtrl = $controller('AddconversionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AddconversionCtrl.awesomeThings.length).toBe(3);
  });
});
