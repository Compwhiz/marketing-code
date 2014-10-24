'use strict';

/**
 * @ngdoc service
 * @name marketingCodeApp.factory.qualifier
 * @description
 * # factory.qualifier
 * Factory in the marketingCodeApp.
 */
angular.module('marketingCodeApp')
    .factory('qualifierFactory', qualifierFactory);

qualifierFactory.$inject = ['$http'];

function qualifierFactory($http) {

    var discountQualifiers = [{
        qualifierID: 1000,
        discountID: 1001,
        qualType: 'RegTypeCode',
        qualCode: '14'
    }, {
        qualifierID: 1001,
        discountID: 1002,
        qualType: 'MemberType',
        qualCode: 'M'
    }];

    var marketingCodeQualifiers = [{
        qualifierID: 1002,
        marketingCodeID: 1001,
        qualType: 'RegTypeCode',
        qualCode: '14'
    }, {
        qualifierID: 1003,
        marketingCodeID: 1001,
        qualType: 'MemberType',
        qualCode: 'M'
    }, {
        qualifierID: 1007,
        marketingCodeID: 1001,
        qualType: 'RegTypeCode',
        qualCode: '18'
    }, {
        qualifierID: 1004,
        marketingCodeID: 1002,
        qualType: 'RegTypeCode',
        qualCode: '14'
    }, {
        qualifierID: 1005,
        marketingCodeID: 1002,
        qualType: 'RegTypeCode',
        qualCode: '16'
    }, {
        qualifierID: 1006,
        marketingCodeID: 1002,
        qualType: 'MemberType',
        qualCode: 'M'
    }];

    return {
        getQualifiersForDiscount: getQualifiersForDiscount,
        getQualifiersForCode: getQualifiersForCode
    };

    function getQualifiersForDiscount(discountID) {
        if (!Number.isInteger(discountID))
            discountID = Number.parseInt(discountID);

        if (!Number.isInteger(discountID))
            return undefined;

        var quals = _.where(discountQualifiers, {
            discountID: discountID
        });

        return _.groupBy(quals, 'qualType');
    }

    function getQualifiersForCode(marketingCodeID) {
        if (!Number.isInteger(marketingCodeID))
            marketingCodeID = Number.parseInt(marketingCodeID);

        if (!Number.isInteger(marketingCodeID))
            return undefined;

        var quals = _.where(marketingCodeQualifiers, {
            marketingCodeID: marketingCodeID
        });

        return _.groupBy(quals, 'qualType');
    }
};
