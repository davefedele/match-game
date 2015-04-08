'use strict';

/**
 * @ngdoc function
 * @name matchGameApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the matchGameApp
 */
angular.module('matchGameApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
