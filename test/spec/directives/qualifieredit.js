'use strict';

describe('Directive: qualifierEdit', function () {

  // load the directive's module
  beforeEach(module('marketingCodeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<qualifier-edit></qualifier-edit>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the qualifierEdit directive');
  }));
});
