'use strict';

/**
 * @ngdoc directive
 * @name marketingCodeApp.directive:datePicker
 * @description
 * # datePicker
 */
angular.module('marketingCodeApp')
    .directive('datePicker', datePicker);

datePicker.$inject = [];

function datePicker() {
    return {
        restrict: 'A',
        link: link
    };

    function link(scope, element, attrs) {
        element.pickadate();
    }
}

/**
 * @ngdoc directive
 * @name marketingCodeApp.directive:datePickerOpen
 * @description
 * # datePickerOpen
 */
angular.module('marketingCodeApp')
    .directive('datePickerOpen', datePickerOpen);

datePickerOpen.$inject = [];

function datePickerOpen() {
    return {
        restrict: 'A',
        link: link
    };

    function link(scope, element, attrs) {
        element.click(function(event) {
            var target;
            if (target = attrs['datePickerOpen']) {
                var $target = $("#" + target);
                $target.pickadate("picker").open();
            }
            return false;
        });
    }
}
