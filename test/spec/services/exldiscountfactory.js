'use strict';

describe('Service: exlDiscountFactory', function () {

  // load the service's module
  beforeEach(module('marketingCodeApp'));

  // instantiate service
  var exlDiscountFactory;
  beforeEach(inject(function (_exlDiscountFactory_) {
    exlDiscountFactory = _exlDiscountFactory_;
  }));

  it('should do something', function () {
    expect(!!exlDiscountFactory).toBe(true);
  });

});
