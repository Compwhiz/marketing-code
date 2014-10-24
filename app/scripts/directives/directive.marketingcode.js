'use strict';

/**
 * @ngdoc directive
 * @name marketingCodeApp.directive:marketingCode
 * @description
 * # marketingCode
 */
angular.module('marketingCodeApp')
    .directive('exlMarketingCode', exlMarketingCode);

exlMarketingCode.$inject = ['marketingCodeFactory'];

function exlMarketingCode(marketingCodeFactory) {
    var directive = {
        templateUrl: '../templates/template.marketingCode.html',
        restrict: 'A',
        link: link
    };

    return directive;

    function link(scope, element, attrs) {

    }

}
