'use strict';

describe('Service: businessClass', function () {

  // load the service's module
  beforeEach(module('marketingCodeApp'));

  // instantiate service
  var businessClass;
  beforeEach(inject(function (_businessClass_) {
    businessClass = _businessClass_;
  }));

  it('should do something', function () {
    expect(!!businessClass).toBe(true);
  });

});
