'use strict';

describe('Service: sharedata2', function () {

  // load the service's module
  beforeEach(module('inventoryAppApp'));

  // instantiate service
  var sharedata2;
  beforeEach(inject(function (_sharedata2_) {
    sharedata2 = _sharedata2_;
  }));

  it('should do something', function () {
    expect(!!sharedata2).toBe(true);
  });

});
