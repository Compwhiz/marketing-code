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

    vm.loading = true;
    vm.codeDoesNotExist = false;
    vm.id = $routeParams.id;
    var hasID = vm.id && vm.id != null && vm.id != '';

    if (hasID) {
        marketingCodeFactory.getMarketingCode(vm.id).then(function(data) {
            vm.masterCode = data;

            if (vm.masterCode && vm.masterCode != null)
                vm.code = angular.copy(vm.masterCode);
            else
                vm.codeDoesNotExist = true;
            // if (typeof vm.code !== undefined) {
            //     vm.discounts = discountFactory.getDiscountsForCode(vm.code.id);
            //     vm.qualifiers = qualifierFactory.getQualifiersForCode(vm.code.id);
            // }

            vm.loading = false;
        });
    } else {
        // New code
        vm.code = {};
        vm.code.isActive = true;
        vm.loading = false;
    }


    marketingCodeFactory.getCodeTypes().then(function(data) {
        vm.codeTypes = data;
    });
    vm.discounts = [];
    if (hasID) {
        discountFactory.getDiscountsForCode(vm.id).then(function(data) {
            vm.discounts = _.groupBy(data,'displayGroup');
        });
    }
    vm.qualifiers = [];
    vm.save = saveCode;
    vm.openQualifierModal = openQualifierModal;

    function saveCode() {
        marketingCodeFactory.saveMarketingCode(vm.code, vm.id);
        $location.path('/');
    }

    function openQualifierModal() {
        $('div#qualifierEditModal').foundation('reveal', 'open');
    }
}
