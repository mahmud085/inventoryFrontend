'use strict';

describe('Controller: EditconversionCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var EditconversionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditconversionCtrl = $controller('EditconversionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditconversionCtrl.awesomeThings.length).toBe(3);
  });
});
