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

    DiscountEditCtrl.$inject = ['$sope', '$q', 'discountFactory', 'businessClassFactory'];

    function DiscountEditCtrl($scope, $q, discountFactory, businessClassFactory) {
        var vm = this;

        // Properties
        vm.discount = {};
        vm.masterDiscount = {};
        vm.showItems = [];
        vm.targets = [];
        vm.showItemSearch = '';
        vm.discountTypes = [];
        vm.selectedTargets = [];

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

            businessClassFactory.getAllShowItems().then(function(data) {
                vm.showItems = _.toArray(data);

                discountFactory.getDiscountWithTargets($scope.discountID).then(function(data) {
                    vm.masterDiscount = data;
                    vm.discount = angular.copy(vm.masterDiscount);

                    initTargets();
                });
            });
        }

        function initTargets() {
            vm.targets = vm.discount.targets;
            angular.forEach(vm.targets, function(target) {
                target.showItemCode = target.target;
            });
        }

        function saveAndClose() {
            //vm.masterDiscount = angular.copy(vm.discount);
            vm.close();
        }

        function close() {
            $($scope.element).foundation('reveal', 'close');
            vm.discount = angular.copy(vm.masterDiscount);
            initTargets();
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
                    vm.targets = vm.targets.concat(items); // _.pluck(items, 'showItemCode'));
            }
            vm.selectedTargets = [];
        }

        function getSelectedShowItemTargets() {
            if (vm.selectedTargets.length == 0)
                return [];

            var items = _.filter(vm.showItems, function(item) {
                return _.contains(vm.selectedTargets, item.showItemCode);
            });
            return items;
        }

        function getPossibleShowItemTargets() {
            var filtered = [];
            var upperSearch = vm.showItemSearch.toUpperCase();
            angular.forEach(vm.showItems, function(showItem) {
                if (_.findWhere(vm.targets, {
                        showItemCode: showItem.showItemCode
                    }) != undefined)
                    return;
                if (vm.showItemSearch == '' || showItem.description.toUpperCase().indexOf(upperSearch) >= 0)
                    filtered.push(showItem);
            });
            return filtered;
        }

        function removeShowItemTarget(showItemCode) {
            var item = _.findWhere(vm.targets, {
                showItemCode: showItemCode
            });
            if (item != undefined) {
                var index = vm.targets.indexOf(item);
                if (index >= 0)
                    vm.targets.splice(index, 1);
            }
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
