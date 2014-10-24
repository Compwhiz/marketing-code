'use strict';

/**
 * @ngdoc service
 * @name marketingCodeApp.factory.discount
 * @description
 * # factory.discount
 * Factory in the marketingCodeApp.
 */
angular.module('marketingCodeApp')
    .factory('discountFactory', discountFactory);

discountFactory.$inject = ['$http'];

function discountFactory($http) {

    var discountTypes = [{
        key: '-- Please Select --',
        value: ''
    }, {
        key: 'Percent Off',
        value: 'PERCENT'
    }, {
        key: 'Amount Off',
        value: 'FLATOFF'
    }, {
        key: 'Set Fee',
        value: 'SETFEE'
    }];

    return {
        discountTypes: discountTypes,
        getDiscountsForCode: getDiscountsForCode,
        getDiscountType: getDiscountType
    };

    function getDiscountsForCode(code) {
        // EventXL data access call to get discounts

        // return mock data for now
        return [{
            id: 1001,
            type: 'PERCENT',
            amount: 50,
            target: 'REG', // 'BISTRO', 'FUNRUN'],
            startDate: new Date(2014, 9, 1, 9),
            endDate: new Date(2014, 9, 30, 4)
        }, {
            id: 1002,
            type: 'FLATOFF',
            amount: 75,
            target: 'CENT', //, 'ATT', 'VIRT'],
            startDate: new Date(2014, 9, 15, 10),
            endDate: new Date(2014, 10, 15, 5)
        }];
    }

    function getDiscountType(value) {
        var item = _.findWhere(discountTypes, {
            value: value
        });

        if (item)
            return item.key;
        return value;
    }
}
