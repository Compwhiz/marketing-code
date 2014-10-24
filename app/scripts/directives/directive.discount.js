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
        templateUrl: '../templates/template.discount.html',
        scope: {
            discount: '=exlDiscount',
        },
    };

    return directive;

    function link(scope, element, attrs) {
        scope.discount.displayAmount = formatDiscountAmount(scope.discount);
        scope.discount.displayType = discountFactory.getDiscountType(scope.discount.type);
        scope.discount.qualifiers = qualifierFactory.getQualifiersForDiscount(scope.discount.id);
    }

    function formatDate(date) {
        return moment(date).format('h:mm:ss A M/D/YYYY');
    }

    function formatDiscountAmount(discount) {
        if (discount.type == 'PERCENT')
            return discount.amount + '%';
        return '$' + discount.amount;
    }
}
