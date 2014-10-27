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
        vm.showItems = {};
        vm.targets = [];
        vm.showItemSearch = '';

        // Functions
        vm.saveAndClose = saveAndClose;
        vm.close = close;

        // Init
        discountFactory.getDiscountWithTargets($scope.discountID).then(function(data) {
            vm.discount = data;
        });

        businessClassFactory.getAllShowItems().then(function(data) {
            vm.showItems = _.toArray(data);
        });

        function saveAndClose() {
            vm.close();
        }

        function close() {
            $scope.$emit('discountEditClosed', [vm.discount.id]);
            $($scope.element).foundation('reveal', 'close');
        }
    }
}
