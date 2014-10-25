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

qualifierFactory.$inject = ['$http', '$q'];

function qualifierFactory($http, $q) {

    var qualifierRef = rootRef.child('qualifiers');
    var codeQualRef = rootRef.child('codeQualifiers');
    var discountQualRef = rootRef.child('discountQualifiers');

    return {
        getQualifiersForDiscount: getQualifiersForDiscount,
        getQualifiersForCode: getQualifiersForCode
    };

    function getQualifiersForDiscount(discountID) {
        var defer = $q.defer();
        discountQualRef.once('value', function(snapshot) {
            var data = snapshot.val();
            _.forEach(data, function(item, idx) {
                item['id'] = idx;
            });
            var discountQuals = _.toArray(data);
            defer.resolve(_.where(discountQuals, {
                discountID: discountID
            }));
        });

        return defer.promise;
    }

    function getQualifiersForCode(codeID) {
        var defer = $q.defer();
        var data;
        codeQualRef.once('value', function(snapshot) {
            data = snapshot.val();

            var qualifierIDs = _.pluck(_.where(_.toArray(data), {
                codeID: codeID
            }), 'qualifierID');
            defer.resolve(qualifierIDs);
        });

        var defer2 = $q.defer();

        defer.promise.then(function(ids) {
            qualifierRef.once('value', function(snapshot) {
                data = snapshot.val();

                _.forEach(data, function(item, idx) {
                    item['id'] = idx;
                });

                defer2.resolve(_.filter(data, function(item) {
                    return _.contains(ids, item.id);
                }));
            })
        });

        return defer2.promise;
    }
};
