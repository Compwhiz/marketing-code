'use strict';

/**
 * @ngdoc directive
 * @name marketingCodeApp.directive:discountEdit
 * @description
 * # discountEdit
 */
angular.module('marketingCodeApp')
    .directive('discountEdit', discountEdit);

discountEdit.$inject = [];

function discountEdit() {
    return {
        templateUrl: '../templates/template.discountedit.html',
        restrict: 'EA',
        scope: {
            discountID: '=discountEdit'
        },
        link: link,
        controller: DiscountEditCtrl,
        controllerAs: 'ctrl'
    }

    function link(scope, element, attrs) {
        scope.element = element;
    }

    DiscountEditCtrl.$inject = ['$scope', '$q', 'discountFactory', 'businessClassFactory'];

    function DiscountEditCtrl($scope, $q, discountFactory, businessClassFactory) {
        var vm = this;

        // Properties
        vm.discount = {};
        vm.masterDiscount = {};
        vm.showItems = [];
        vm.targets = [];
        vm.showItemSearch = '';
        vm.discountTypes = [];

        // Functions
        vm.saveAndClose = saveAndClose;
        vm.close = close;
        vm.addSelectedShowItemTargets = addSelectedShowItemTargets;
        vm.getPossibleShowItemTargets = getPossibleShowItemTargets;
        vm.removeShowItemTarget = removeShowItemTarget;
        vm.clearSelectedShowItemTargets = clearSelectedShowItemTargets;

        init();

        function init() {
            discountFactory.getDiscountTypes().then(function(data) {
                vm.discountTypes = data;
            });

            discountFactory.getDiscountWithTargets($scope.discountID).then(function(data) {
                vm.masterDiscount = data;
                vm.discount = angular.copy(vm.masterDiscount);
                vm.targets = _.pluck(vm.discount.targets, 'target');
            });

            businessClassFactory.getAllShowItems().then(function(data) {
                vm.showItems = _.toArray(data);
            });
        }

        function saveAndClose() {
            //vm.masterDiscount = angular.copy(vm.discount);
            vm.close();
        }

        function close() {
            $($scope.element).foundation('reveal', 'close');
            vm.discount = angular.copy(vm.masterDiscount);
            vm.targets = _.pluck(vm.discount.targets, 'target');
            vm.showItemSearch = '';
            $scope.$emit('discountEditClosed', [vm.discount.id]);
        }

        function clearSelectedShowItemTargets() {
            vm.targets = [];
        }

        function addSelectedShowItemTargets() {
            var items = getSelectedShowItemTargets();
            if (items != null && items != '' && items != [])
                vm.targets = vm.targets.concat(items);
            else {
                items = getPossibleShowItemTargets();
                // add if there is only 1 search result
                if (items.length == 1)
                    vm.targets = vm.targets.concat(_.pluck(items, 'showItemCode'));
            }
        }

        function getSelectedShowItemTargets() {
            return $($scope.element).find('select.showItemSelectList').val();
        }

        function getPossibleShowItemTargets() {
            var filtered = [];
            var upperSearch = vm.showItemSearch.toUpperCase();
            angular.forEach(vm.showItems, function(showItem) {
                if (vm.targets.indexOf(showItem.showItemCode) >= 0)
                    return;
                if (vm.showItemSearch == '' || showItem.description.toUpperCase().indexOf(upperSearch) >= 0)
                    filtered.push(showItem);
            });
            return filtered;
        }

        function removeShowItemTarget(showItemCode) {
            var index = vm.targets.indexOf(showItemCode);
            if (index >= 0)
                vm.targets.splice(index, 1);
        }
    }
}

// angular.module('marketingCodeApp').filter('propertyContains', propertyContains);

// function propertyContains() {
//     return function(input, options) {
//         var filtered = [];
//         if (angular.isUndefined(input) || angular.isUndefined(options) ||
//             angular.isUndefined(options.searchTerm) || angular.isUndefined(options.field))
//             return filtered;

//         if (angular.isUndefined(options.targets))
//             options.targets = [];

//         if (options.searchTerm == '')
//             return input;

//         options.searchTerm = options.searchTerm.toUpperCase();
//         angular.forEach(input, function(item) {
//             if (!angular.isUndefined(item[options.field])) {
//                 if (options.targets.indexOf(item[options.field]) < 0 && item[options.field].toUpperCase().indexOf(options.searchTerm) >= 0)
//                     filtered.push(item);
//             }
//         });
//         return filtered;
//     }
// }
