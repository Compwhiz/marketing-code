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

discountFactory.$inject = ['$http', '$q'];

function discountFactory($http, $q) {

    var discountRef = rootRef.child('discounts');
    var discountTargetRef = rootRef.child('discountTargets');
    var discountTypeRef = rootRef.child('discountTypes');

    return {
        getDiscountTypes: getDiscountTypes,
        getDiscountsForCode: getDiscountsForCode,
        getDiscountType: getDiscountType,
        getTargetsForDiscount: getTargetsForDiscount,
        getDiscount: getDiscount,
        getDiscountWithTargets: getDiscountWithTargets,
        saveDiscounts:saveDiscounts,
    };

    function getDiscountTypes() {
        var defer = $q.defer();
        discountTypeRef.once('value', function(snapshot) {
            defer.resolve(snapshot.val());
        });
        return defer.promise;
    }

    function getDiscountsForCode(codeID) {
        // EventXL data access call to get discounts
        var defer = $q.defer();

        discountRef.once('value', function(snapshot) {
            var data = snapshot.val();
            _.forEach(data, function(item, idx) {
                item['id'] = idx;
            });
            var discounts = _.toArray(data);
            defer.resolve(_.where(discounts, {
                codeID: codeID
            }));
        });
        return defer.promise;
    }

    function getDiscountType(value) {
        return value;
    }

    function getDiscountWithTargets(discountID) {
        var defer = $q.defer();

        getDiscount(discountID).then(function(data) {
            getTargetsForDiscount(discountID).then(function(targets) {
                data.targets = targets;
                defer.resolve(data);
            });
        });

        return defer.promise;
    }

    function getDiscount(discountID) {
        var defer = $q.defer();

        if (typeof(discountID) == 'undefined')
            defer.resolve(undefined);
        else {
            discountRef.child(discountID).once('value', function(snapshot) {
                defer.resolve(snapshot.val());
            }, function() {
                defer.resolve(undefined);
            });
        }

        return defer.promise;
    }

    function getTargetsForDiscount(discountID) {
        var defer = $q.defer();
        discountTargetRef.once('value', function(snapshot) {
            var data = snapshot.val();
            _.forEach(data, function(item, idx) {
                item['id'] = idx;
            });
            var targets = _.toArray(data);
            defer.resolve(_.where(targets, {
                discountID: discountID
            }));
        });
        return defer.promise;
    }

    function saveDiscounts(codeID, discounts) {

    }
}
