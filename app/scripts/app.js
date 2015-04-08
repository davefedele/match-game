'use strict';

/**
 * @ngdoc overview
 * @name matchGameApp
 * @description
 * # matchGameApp
 *
 * Main module of the application.
 */
angular
  .module('matchGameApp', [
    'ngAnimate',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/play', {
        templateUrl: 'views/play.html',
        controller: 'PlayCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
