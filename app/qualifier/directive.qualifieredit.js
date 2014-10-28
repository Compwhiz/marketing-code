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

        // Properties
        vm.statuses = {};
        vm.memberTypes = [];
        vm.regTypes = [];
        vm.dateStatuses = [];
        vm.qualifiers = {};
        vm.groupedQualifiers = [];
        vm.selectedStatuses = {};
        vm.masterSelectedStatuses = {};

        // Functions
        vm.saveAndClose = saveAndClose;
        vm.close = close;
        vm.toggleSelected = toggleSelected;
        vm.getGroupHeaderText = getGroupHeaderText;
        vm.isSelected = isSelected;

        // Init
        getAllStatuses();
        getQualifiersForCode();

        function toggleSelected(type, code) {
            if (typeof(code) == 'undefined' || typeof(type) == 'undefined')
                return;

            if (typeof(vm.selectedStatuses[type]) == 'undefined')
                vm.selectedStatuses[type] = [];

            if (!_.contains(vm.selectedStatuses[type], code))
                vm.selectedStatuses[type].push(code);
            else {
                var index = _.indexOf(vm.selectedStatuses[type], code);
                if (index >= 0)
                    vm.selectedStatuses[type].splice(index, 1);
            }
        }

        function saveAndClose() {
            _.forEach(vm.statuses, function(qualifiers, type) {
                _.forEach(vm.statuses[type], function(qualifier, index) {
                    var q = getQualifier(type, qualifier.statusCode);
                    var selected = isSelected(type, qualifier.statusCode);
                    if (typeof(q) != 'undefined') {
                        q.deleted = !selected;
                    } else if (selected) {
                        vm.qualifiers.push({
                            qualCode: qualifier.statusCode,
                            qualType: type
                        });
                    }
                });
            });
            qualifierFactory.saveCodeQualifiers($scope.codeID, vm.qualifiers);
            vm.masterSelectedStatuses = angular.copy(vm.selectedStatuses);
            vm.close();
        }

        function close() {
            vm.selectedStatuses = angular.copy(vm.masterSelectedStatuses);
            $scope.$emit('qualifierEditClosed');
            $($scope.element).foundation('reveal', 'close');
        }

        function getQualifier(type, code) {
            return _.findWhere(vm.qualifiers, {
                qualCode: code,
                qualType: type
            });
        }

        function getAllStatuses() {
            businessClassFactory.getAllStatuses().then(function(data) {
                vm.statuses = data;
                vm.memberTypes = data.MEMBER;
                vm.regTypes = data.REGTYPE;
                vm.dateStatuses = data.DATE;
            });
        }


        function getQualifiersForCode() {
            qualifierFactory.getQualifiersForCode($scope.codeID).then(function(data) {
                vm.qualifiers = data;
                vm.groupedQualifiers = _.groupBy(data, 'qualType');

                _.forEach(vm.groupedQualifiers, function(qualifiers, type) {
                    var codes = _.pluck(qualifiers, 'qualCode');

                    _.forEach(codes, function(code) {
                        toggleSelected(type, code);
                    });
                });

                vm.masterSelectedStatuses = angular.copy(vm.selectedStatuses);
            });
        }

        function isSelected(type, code) {
            if (typeof(code) == 'undefined' || typeof(type) == 'undefined' || typeof(vm.selectedStatuses[type]) == 'undefined')
                return false;

            return _.contains(vm.selectedStatuses[type], code);
        }

        function getGroupHeaderText(type) {
            return qualifierFactory.getGroupHeaderText(type);
        }
    }
}
