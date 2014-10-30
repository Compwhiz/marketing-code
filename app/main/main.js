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

MainCtrl.$inject = ['$scope', '$location', 'marketingCodeFactory'];

function MainCtrl($scope, $location, marketingCodeFactory) {
    var vm = this;

    vm.deleteCode = deleteCode;
    vm.editMarketingCode = editMarketingCode;

    marketingCodeFactory.getAllCodes().then(function(data) {
        vm.codes = data;
    });

    function deleteCode(id) {
        if (angular.isUndefined(id))
            return;

        $.econfirm('Are you sure you want to delete this marketing code (' + id + ')?', confirmDelete, cancelDelete);

        function confirmDelete() {
            console.log('confirm delete');

            $scope.$apply(function() {
                vm.codes[id].isDeleted = true;
            });
        }

        function cancelDelete() {
            console.log('cancel delete');
        }
    }

    function editMarketingCode(id) {
        if (angular.isUndefined(id))
            return;

        var path = '/marketingCode/' + id;
        $location.path(path);
    }
}
