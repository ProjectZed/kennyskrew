var app = angular.module('myUpdate', []);


app.controller('scheduleTime', ['$scope', function($scope) {
    $scope.driverStep = "";
    $scope.auditId = "";
    $scope.scheduleStart = "";
}]);
