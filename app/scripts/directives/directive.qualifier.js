'use strict';

/**
 * @ngdoc directive
 * @name marketingCodeApp.directive:qualifier
 * @description
 * # qualifier
 */
angular.module('marketingCodeApp')
    .directive('exlQualifier', qualifier);

qualifier.$inject = [];

function qualifier() {
    var directive = {
        templateUrl: '../templates/template.qualifier.html',
        restrict: 'A',
        link: link,
        scope:{
        	qualifier:'=exlQualifier'
        }
    };

    return directive;

    function link(scope, element, attrs) {}
}
