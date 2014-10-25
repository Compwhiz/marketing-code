'use strict';

/**
 * @ngdoc service
 * @name marketingCodeApp.businessClass
 * @description
 * # businessClass
 * Factory in the marketingCodeApp.
 */
angular.module('marketingCodeApp')
    .factory('businessClassFactory', businessClassFactory);

businessClassFactory.$inject = ['$q'];

function businessClassFactory($q) {

    var statusRef = rootRef.child('statuses');
    var statuses;

    statusRef.once('value', function(snapshot) {
        statuses = _.groupBy(snapshot.val(), 'type');
    });

    // Public API here
    return {
        getAllStatuses: getAllStatuses,
        selectRegStatus: selectRegStatus,
        selectMemberStatus: selectMemberStatus
    };

    function getAllStatuses() {
        var defer = $q.defer();
        if (!statuses) {
            statusRef.once('value', function(snapshot) {
                defer.resolve(_.groupBy(snapshot.val(), 'type'));
            });
        } else {
            defer.resolve(statuses);
        }

        return defer.promise;
    }

    function selectRegStatus(statusCode) {
        return _.findWhere(statuses.REGTYPE, {
            statusCode: statusCode
        });
    }

    function selectMemberStatus(statusCode) {
        return _.findWhere(statuses.memberTypes, {
            statusCode: statusCode
        });
    }

    function selectStatus(type,statusCode){
        switch(type){
            case 'REGTYPE':
            break;
            case 'MEMBER':
            break;
            case 'DATE':
            break;
            default:
            break;
        }
    }
}
