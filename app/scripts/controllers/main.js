'use strict';

angular.module('familyphotos.main', [])
  .controller('MainCtrl', function ($scope) {
    $scope.working = 'Angular is stable';
    $scope.image = null;
    $scope.imageFileName = '';
});
