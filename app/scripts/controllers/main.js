'use strict';

/**
 * @ngdoc function
 * @name marketingCodeApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the marketingCodeApp
 */
angular.module('marketingCodeApp')
    .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['marketingCodeFactory'];

function MainCtrl(marketingCodeFactory) {
    var vm = this;

    vm.codes = marketingCodeFactory.getAllCodes();
}
