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
            codeID: '=qualifierEdit'
        },
        link: link,
        controller: QualifierEditCtrl,
        controllerAs: 'ctrl'
    };

    function link(scope, element, attrs, MarketingCodeCtrl) {
        scope.element = element;
    }

    QualifierEditCtrl.$inject = ['$scope', 'qualifierFactory', 'businessClassFactory']

    function QualifierEditCtrl($scope, qualifierFactory, businessClassFactory) {
        var vm = this;

        vm.possibleQualifiers = {};
        vm.toggleSelected = toggleSelected;
        vm.qualifiers = {};
        vm.groupedQualifiers = [];
        vm.saveAndClose = saveAndClose;
        vm.close = close;

        businessClassFactory.getAllStatuses().then(function(data) {
            vm.possibleQualifiers = data;
        });

        qualifierFactory.getQualifiersForCode($scope.codeID).then(function(data) {
            vm.qualifiers = data;
            vm.groupedQualifiers = _.groupBy(data, 'qualType');

            _.forEach(vm.groupedQualifiers, function(qualifiers, type) {
                var codes = _.pluck(qualifiers, 'qualCode');
                _.forEach(vm.possibleQualifiers[type], function(status, index) {
                    status.selected = _.contains(codes, status.statusCode);
                });
            });
        });

        function toggleSelected(qualifier) {
            qualifier.selected = !qualifier.selected;
        }

        function saveAndClose() {
            _.forEach(vm.possibleQualifiers, function(qualifiers, type) {
                _.forEach(vm.possibleQualifiers[type], function(qualifier, index) {
                    var q = getQualifier(type, qualifier.statusCode);
                    if (typeof(q) != 'undefined') {
                        q.deleted = !qualifier.selected;
                    } else if (qualifier.selected) {
                        vm.qualifiers.push({
                            qualCode: qualifier.statusCode,
                            qualType: type
                        });
                    }
                });
            });

            vm.close();
        }

        function close() {
            $scope.$emit('qualifierEditClosed');
            $($scope.element).foundation('reveal', 'close');
        }

        function getQualifier(type, code) {
            return _.findWhere(vm.qualifiers, {
                qualCode: code,
                qualType: type
            });
        }
    }
}
