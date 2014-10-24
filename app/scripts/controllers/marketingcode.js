'use strict';

/**
 * @ngdoc function
 * @name marketingCodeApp.controller:MarketingcodeCtrl
 * @description
 * # MarketingcodeCtrl
 * Controller of the marketingCodeApp
 */
angular.module('marketingCodeApp')
    .controller('MarketingCodeCtrl', MarketingCodeCtrl);

MarketingCodeCtrl.$inject = ['$scope', '$routeParams', '$location', 'marketingCodeFactory', 'discountFactory', 'qualifierFactory'];

function MarketingCodeCtrl($scope, $routeParams, $location, marketingCodeFactory, discountFactory, qualifierFactory) {
    var vm = this;

    vm.masterCode = marketingCodeFactory.getMarketingCode($routeParams.id);

    if (vm.masterCode)
        vm.code = angular.copy(vm.masterCode);
    else {
        vm.code = {};
        vm.code.id = marketingCodeFactory.nextCodeID();
        vm.code.isActive = true;
    }

    vm.codeTypes = marketingCodeFactory.codeTypes;
    vm.discounts = [];
    vm.qualifiers = [];
    vm.save = saveCode;
    vm.openQualifierModal = openQualifierModal;

    if (typeof vm.code !== undefined) {
        vm.discounts = discountFactory.getDiscountsForCode(vm.code.id);
        vm.qualifiers = qualifierFactory.getQualifiersForCode(vm.code.id);
    }


    function saveCode() {
        marketingCodeFactory.saveMarketingCode(vm.code);
        $location.path('/');
    }

    function openQualifierModal(){
        $('div#qualifierEditModal').foundation('reveal','open');
    }
}
