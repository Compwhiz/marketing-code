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
    var showItemRef = rootRef.child('showItems');
    var statuses;
    var showItems;

    statusRef.once('value', function(snapshot) {
        statuses = _.groupBy(snapshot.val(), 'type');
    });

    // Public API here
    return {
        getAllStatuses: getAllStatuses,
        selectStatus: selectStatus,
        getAllShowItems: getAllShowItems,
        selectShowItem: selectShowItem,
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

    function selectStatus(type, statusCode) {
        if (typeof(type) == 'undefined' || typeof(statuses[type]) == 'undefined')
            return statusCode;

        return _.findWhere(statuses[type], {
            statusCode: statusCode
        });
    }

    function selectShowItem(showItemCode) {
        var defer = $q.defer();

        var deferGetShowItems = $q.defer();
        if (showItems == undefined)
            getAllShowItems().then(function(data) {
                deferGetShowItems.resolve();
            })
        else
            deferGetShowItems.resolve();

        deferGetShowItems.promise.then(function(data) {
            var showItem = _.findWhere(showItems, {
                showItemCode: showItemCode
            });
            defer.resolve(showItem);
        });

        return defer.promise;
    }

    function getAllShowItems() {
        var defer = $q.defer();

        if (typeof(showItems) != 'undefined')
            defer.resolve(showItems);
        else {
            showItemRef.once('value', function(snapshot) {
                    showItems = snapshot.val();

                    _.forEach(showItems, function(item, id) {
                        item.id = id;
                    })

                    defer.resolve(showItems);
                },
                function(error) {
                    defer.resolve(undefined);
                });
        }
        return defer.promise;
    }
}
