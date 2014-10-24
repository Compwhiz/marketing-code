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

discountFactory.$inject = ['$http','$q'];

function discountFactory($http,$q) {

    var discountRef = rootRef.child('discounts');

    return {
        getDiscountTypes: getDiscountTypes,
        getDiscountsForCode: getDiscountsForCode,
        getDiscountType: getDiscountType
    };

    function getDiscountTypes() {
        var defer = $q.defer();
        rootRef.child('discountType').once('value', function(snapshot) {
            defer.resolve(snapshot.val());
        });
        return defer.promise;
    }

    function getDiscountsForCode(codeID) {
        // EventXL data access call to get discounts
        var defer = $q.defer();

        discountRef.once('value', function(snapshot){
            var discounts = _.toArray(snapshot.val());
            defer.resolve(_.where(discounts, {codeID:codeID}));
        });
        return defer.promise;
    }

    function getDiscountType(value) {
        return value;
    }
}
