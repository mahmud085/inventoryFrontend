'use strict';

describe('Controller: EditctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var EditctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditctrlCtrl = $controller('EditctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditctrlCtrl.awesomeThings.length).toBe(3);
  });
});
