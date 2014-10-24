'use strict';

describe('Service: factory.qualifier', function () {

  // load the service's module
  beforeEach(module('marketingCodeApp'));

  // instantiate service
  var factory.qualifier;
  beforeEach(inject(function (_factory.qualifier_) {
    factory.qualifier = _factory.qualifier_;
  }));

  it('should do something', function () {
    expect(!!factory.qualifier).toBe(true);
  });

});
