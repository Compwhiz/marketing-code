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
        getQualifiersForCode: getQualifiersForCode,
        saveCodeQualifiers:saveCodeQualifiers
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
                    return !item.deleted && _.contains(ids, item.id);
                }));
            })
        });

        return defer2.promise;
    }

    function saveCodeQualifiers(codeID, qualifiers){
        if(typeof(codeID) == 'undefined')
            return;

        _.forEach(qualifiers, function(qualifier){
            // new qualifier
            if(typeof(qualifier.id) == 'undefined'){
                qualifier.id = qualifierRef.push(qualifier).name();
                codeQualRef.push({codeID:codeID,qualifierID:qualifier.id});
            }else{
                qualifierRef.child(qualifier.id).update(qualifier);
            }
        });
    }
};
