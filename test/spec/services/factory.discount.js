'use strict';

describe('Service: factory.discount', function () {

  // load the service's module
  beforeEach(module('marketingCodeApp'));

  // instantiate service
  var factory.discount;
  beforeEach(inject(function (_factory.discount_) {
    factory.discount = _factory.discount_;
  }));

  it('should do something', function () {
    expect(!!factory.discount).toBe(true);
  });

});
