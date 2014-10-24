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

marketingCodeFactory.$inject = ['$http', '$q'];

function marketingCodeFactory($http, $q) {

    var codesRef = rootRef.child('codes');

    return {
        getAllCodes: getAllCodes,
        getMarketingCode: getMarketingCode,
        saveMarketingCode: saveMarketingCode,
        getCodeTypes: getCodeTypes
    };

    function getCodeTypes() {
        var defer = $q.defer();

        rootRef.child('codeTypes').once('value', function(snapshot) {
            defer.resolve(snapshot.val());
        });

        return defer.promise;
    }

    function getMarketingCode(id) {
        var defer = $q.defer();

        codesRef.child(id).once('value', function(snapshot) {
            defer.resolve(snapshot.val());
        });

        return defer.promise;
    }

    function saveMarketingCode(code, id) {
        // EventXL data access call to save code
        if (typeof code === "undefined")
            return;

        if (id && id != null && id != '')
            codesRef.child(id).update(code);
        else
            codesRef.push(code);
    }

    function getAllCodes() {
        // EventXL data access call to get all codes
        var deffered = $q.defer();

        codesRef.once('value', function(snapshot) {
            deffered.resolve(snapshot.val());
        });

        // return mock data for now
        return deffered.promise;
    }
}
