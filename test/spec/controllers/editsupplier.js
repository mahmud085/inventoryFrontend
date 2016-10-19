'use strict';

describe('Controller: EditsupplierCtrl', function () {

  // load the controller's module
  beforeEach(module('inventoryAppApp'));

  var EditsupplierCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditsupplierCtrl = $controller('EditsupplierCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditsupplierCtrl.awesomeThings.length).toBe(3);
  });
});
