'use strict';

describe('Controller: CatagoryinputCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var CatagoryinputCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CatagoryinputCtrl = $controller('CatagoryinputCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CatagoryinputCtrl.awesomeThings.length).toBe(3);
  });
});
