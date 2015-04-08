'use strict';

/**
 * @ngdoc function
 * @name matchGameApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the matchGameApp
 */
angular.module('matchGameApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
