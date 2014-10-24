'use strict';

/**
 * @ngdoc overview
 * @name marketingCodeApp
 * @description
 * # marketingCodeApp
 *
 * Main module of the application.
 */
angular
  .module('marketingCodeApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'mm.foundation'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/view.main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/marketingCode/:id?', {
        templateUrl: 'views/view.marketingCode.html',
        controller:'MarketingCodeCtrl',
        controllerAs: 'ctrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  var rootRef = new Firebase('https://scorching-inferno-7654.firebaseio.com/');
