'use strict';

/**
 * @ngdoc directive
 * @name marketingCodeApp.directive:qualifierEdit
 * @description
 * # qualifierEdit
 */
angular.module('marketingCodeApp')
    .directive('qualifierEdit', qualifierEdit);

qualifierEdit.$inject = ['qualifierFactory', 'businessClassFactory'];

function qualifierEdit() {
    return {
        templateUrl: '../templates/template.qualifieredit.html',
        restrict: 'EA',
        scope: {
            marketingCodeID: '=qualifierEdit'
        },
        controller: QualifierEditCtrl,
        controllerAs: 'ctrl',
        link: link
    };

    function link(scope, element, attrs) {

    }

    QualifierEditCtrl.$inject = ['$scope', 'qualifierFactory', 'businessClassFactory']

    function QualifierEditCtrl($scope, qualifierFactory, businessClassFactory) {
    	var vm = this;

    	vm.qualifiers = businessClassFactory.getAllStatuses();
    	vm.currentQualifiers = qualifierFactory.getQualifiersForCode($scope.marketingCodeID);
    }
}
