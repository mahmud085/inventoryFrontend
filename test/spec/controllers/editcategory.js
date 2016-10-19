'use strict';

describe('Controller: EditcategoryCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var EditcategoryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditcategoryCtrl = $controller('EditcategoryCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditcategoryCtrl.awesomeThings.length).toBe(3);
  });
});
