var app = angular.module('digitalDash', []);

app.controller('scheduleTime', function($scope) {
    $scope.driverStep = "";
    $scope.auditId = "";
    $scope.scheduleStart = "";
    $scope.getValue = function () {
      $scope.banner = "You have successfully executed: " + $scope.driverStep;
    };
});
