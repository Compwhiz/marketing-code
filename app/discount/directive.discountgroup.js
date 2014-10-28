'use strict';

/**
 * @ngdoc directive
 * @name marketingCodeApp.directive:discountGroup
 * @description
 * # discountGroup
 */
angular.module('marketingCodeApp')
    .directive('discountGroup',
        discountGroup);

discountGroup.$inject = [];

function discountGroup() {

    return {
        templateUrl: '../templates/template.discountgroup.html',
        restrict: 'EA',
        link: link,
        scope: {
            discounts: '=discountGroup',
        },
    };

    function link(scope, element, attrs) {
        
    }
}
