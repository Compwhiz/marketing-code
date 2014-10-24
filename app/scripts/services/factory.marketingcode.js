'use strict';

/**
 * @ngdoc service
 * @name marketingCodeApp.factory.marketingCode
 * @description
 * # factory.marketingCode
 * Factory in the marketingCodeApp.
 */
angular.module('marketingCodeApp')
    .factory('marketingCodeFactory', marketingCodeFactory);

marketingCodeFactory.$inject = ['$http'];

function marketingCodeFactory($http) {

    var codes = [{
        id: 1001,
        code: 'TEST1',
        description: 'Description for code 1',
        codeType: 'DISCOUNT',
        beginDate: new Date(),
        endDate: new Date(),
        isActive: true
    }, {
        id: 1002,
        code: 'TEST2',
        description: '',
        codeType: 'DISCOUNT',
        beginDate: new Date(),
        endDate: new Date(),
        isActive: true
    }];

    return {
        getAllCodes: getAllCodes,
        getMarketingCode: getMarketingCode,
        saveMarketingCode: saveMarketingCode,
        nextCodeID: nextCodeID,
        codeTypes: [{
            key: '-- Please Select One --',
            value: ''
        }, {
            key: 'Access',
            value: 'ACCESS'
        }, { 
            key: 'Discount',
            value: 'DISCOUNT'
        }, {
            key: 'Tracking',
            value: 'TRACKING'
        }]
    };

    function getMarketingCode(id) {
        if (!Number.isInteger(id))
            id = Number.parseInt(id);

        if (!Number.isInteger(id))
            return undefined;

        return _.findWhere(codes, {
            id: id
        });
    }

    function saveMarketingCode(code) {
        // EventXL data access call to save code

        // save logic for now
        if (typeof code === "undefined" || typeof code.id === "undefined")
            return;

        var index = -1;
        codes.forEach(function(item, idx) {
            if (item.id == code.id) {
                index = idx;
                return;
            }
        });

        if (index >= 0)
            codes[index] = angular.copy(code);
        else
            codes.push(code);
    }

    function getAllCodes() {
        // EventXL data access call to get all codes

        // return mock data for now
        return codes
    }

    function nextCodeID() {
        var max = _.max(codes, function(code) {
            return code.id;
        });

        return max.id + 1;
    }
}
