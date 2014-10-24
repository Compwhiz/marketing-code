'use strict';

/**
 * @ngdoc directive
 * @name marketingCodeApp.directive:timePicker
 * @description
 * # timePicker
 */
angular.module('marketingCodeApp')
    .directive('timePicker', timePicker);

timePicker.$inject = [];

function timePicker() {
    return {
        restrict: 'A',
        link: link
    };

    function link(scope, element, attrs) {
        element.pickatime();
    }
}

/**
 * @ngdoc directive
 * @name marketingCodeApp.directive:timePickerOpen
 * @description
 * # timePickerOpen
 */
angular.module('marketingCodeApp')
    .directive('timePickerOpen', timePickerOpen);

timePickerOpen.$inject = [];

function timePickerOpen() {
    return {
        restrict: 'A',
        link: link
    };

    function link(scope, element, attrs) {
        element.click(function(event) {
            var target;
            if (target = attrs['timePickerOpen']) {
                var $target = $("#" + target);
                $target.pickatime("picker").open();
            }
            return false;
        });
    }
}
