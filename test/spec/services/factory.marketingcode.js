'use strict';

describe('Service: factory.marketingCode', function () {

  // load the service's module
  beforeEach(module('marketingCodeApp'));

  // instantiate service
  var factory.marketingCode;
  beforeEach(inject(function (_factory.marketingCode_) {
    factory.marketingCode = _factory.marketingCode_;
  }));

  it('should do something', function () {
    expect(!!factory.marketingCode).toBe(true);
  });

});
