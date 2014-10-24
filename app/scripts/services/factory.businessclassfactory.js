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

businessClassFactory.$inject = [];

function businessClassFactory() {

    var statuses = {
        regTypes: [{
            statusCode: '14',
            description: 'Nurse'
        }, {
            statusCode: '15',
            description: 'Doctor'
        }, {
            statusCode: '16',
            description: 'Student'
        }, {
            statusCode: '17',
            description: 'Faculty'
        }, {
            statusCode: '18',
            description: 'Staff'
        }, {
            statusCode: '20',
            description: 'Press'
        }, {
            statusCode: 'VIP',
            description: 'VIP Registrant'
        }, {
            statusCode: 'ECO',
            description: 'Exhibitor Contact'
        }],
        memberTypes: [{
            statusCode: 'M',
            description: 'Member'
        }, {
            statusCode: 'N',
            description: 'Non-Member'
        }]
    };

    // Public API here
    return {
        getAllStatuses: getAllStatuses,
        selectRegStatus: selectRegStatus,
        selectMemberStatus: selectMemberStatus
    };

    function getAllStatuses(type) {
        if (typeof(type) != 'undefined' && type != null)
            return statuses[type]
        return statuses;
    }

    function selectRegStatus(statusCode) {
        return _.findWhere(statuses.regTypes, {
            statusCode: statusCode
        });
    }

    function selectMemberStatus(statusCode) {
        return _.findWhere(statuses.memberTypes, {
            statusCode: statusCode
        });
    }
}
