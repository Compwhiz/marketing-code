'use strict';

/**
 * @ngdoc directive
 * @name marketingCodeApp.directive:discountGroup
 * @description
 * # discountGroup
 */
angular.module('marketingCodeApp')
  .directive('discountGroup', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the discountGroup directive');
      }
    };
  });
