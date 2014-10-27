'use strict';

describe('Directive: discountEdit', function () {

  // load the directive's module
  beforeEach(module('marketingCodeApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<discount-edit></discount-edit>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the discountEdit directive');
  }));
});
