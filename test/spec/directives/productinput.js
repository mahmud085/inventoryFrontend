'use strict';

describe('Directive: productInput', function () {

  // load the directive's module
  beforeEach(module('inventoryAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<product-input></product-input>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the productInput directive');
  }));
});
