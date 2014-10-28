'use strict';

/**
 * @ngdoc directive
 * @name marketingCodeApp.directive:discount
 * @description
 * # discount
 */
angular.module('marketingCodeApp')
    .directive('exlDiscount', discount);

discount.$inject = ['discountFactory', 'qualifierFactory'];

function discount(discountFactory, qualifierFactory) {
    var directive = {
        link: link,
        restrict: 'A',
        //require: '^discountGroup',
        templateUrl: '../templates/template.discount.html',
        scope: {
            discount: '=exlDiscount',
        },
        controller: DiscountCtrl,
        controllerAs: 'ctrl'
    };

    return directive;

    function link(scope, element, attrs) {}

    DiscountCtrl.$inject = ['$scope', 'discountFactory', 'qualifierFactory'];

    function DiscountCtrl($scope, discountFactory, qualifierFactory) {
        var vm = this;

        // Functions
        vm.discount = $scope.discount;
        vm.formatDiscountAmount = formatDiscountAmount;
        vm.openDiscountModal = openDiscountModal;
        vm.targets = [];

        // Init
        discountFactory.getTargetsForDiscount(vm.discount.id).then(function(data) {
            vm.targets = data;
        });
        vm.displayAmount = formatDiscountAmount(vm.discount);
        vm.displayType = discountFactory.getDiscountType(vm.discount.type);
        vm.qualifiers = qualifierFactory.getQualifiersForDiscount(vm.discount.id);

        function formatDiscountAmount(discount) {
            if (discount.type == 'PERCENT')
                return discount.amount + '%';
            return '$' + discount.amount;
        }

        function openDiscountModal(index) {
            $('div#discountEditModal' + index).foundation('reveal', 'open', {
                close_on_esc: false,
                close_on_background_click: false
            });
        }
    }
}
