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

    // Properties
    vm.loading = true;
    vm.codeDoesNotExist = false;
    vm.id = $routeParams.id;
    vm.qualifiers = [];
    vm.discounts = [];
    var hasID = vm.id && vm.id != null && vm.id != '';

    // Functions
    vm.save = saveCode;
    vm.openQualifierModal = openQualifierModal;
    vm.getGroupHeaderText = getGroupHeaderText;

    // Init
    if (hasID) {
        marketingCodeFactory.getMarketingCode(vm.id).then(function(data) {
            vm.masterCode = data;

            if (vm.masterCode && vm.masterCode != null)
                vm.code = angular.copy(vm.masterCode);
            else
                vm.codeDoesNotExist = true;

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

    if (hasID) {
        discountFactory.getDiscountsForCode(vm.id).then(function(data) {
            vm.discounts = data;
        });
    }

    getCodeQualifiers();

    // Events
    $scope.$on('qualifierEditClosed', function() {
        getCodeQualifiers();
    });

    function saveCode() {
        marketingCodeFactory.saveMarketingCode(vm.code, vm.id);
        $location.path('/');
    }

    function openQualifierModal() {
        $('div#qualifierEditModal').foundation('reveal', 'open', {
            close_on_esc: false,
            close_on_background_click: false
        });
    }

    function getCodeQualifiers() {
        vm.loadingCodeQualifiers = true;
        qualifierFactory.getQualifiersForCode(vm.id).then(function(data) {
            vm.qualifiers = _.groupBy(data, 'qualType');
            vm.loadingCodeQualifiers = false;
        }, function() {
            vm.loadingCodeQualifiers = true;
        });
    }

    function getGroupHeaderText(type) {
        return qualifierFactory.getGroupHeaderText(type);
    }
}
