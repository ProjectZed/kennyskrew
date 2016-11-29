//controller for Delete Driver Schedule
app.controller('Dl_Driver_Schedule', function($scope, $http) {
    $scope.submitValue = function () {
      $http.put('/delete/driverSchedule', $scope.form).
        success(function(data) {
          $scope.banner = data
        });
    };
});
//controller for Delete Driver Step
app.controller('Dl_Driver_Step_RunName_GrpNbr', function($scope, $http) {
    $scope.submitValue = function () {
      $http.put('/delete/Driver_Step_RunName_GrpNbr', $scope.form).
        success(function(data) {
          $scope.banner = data
        });
    };
});
//controller for Delete Driver Step
app.controller('Dl_Driver_Step_RunName', function($scope, $http) {
    $scope.submitValue = function () {
      $http.put('/delete/Driver_Step_RunName', $scope.form).
        success(function(data) {
          $scope.banner = data
        });
    };
});
//controller for Delete Driver Step
app.controller('Dl_Driver_Step_RunName_Sid', function($scope, $http) {
    $scope.submitValue = function () {
      $http.put('/delete/Driver_Step_RunName_Sid', $scope.form).
        success(function(data) {
          $scope.banner = data
        });
    };
});
//controller for Delete Driver Step Detail
app.controller('Dl_Driver_Step_Detail_RunName', function($scope, $http) {
    $scope.submitValue = function () {
      $http.put('/delete/Driver_Step_RunName_Sid', $scope.form).
        success(function(data) {
          $scope.banner = data
        });
    };
});
