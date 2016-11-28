//controller for Update Schedule Start time
app.controller('scheduleStartTime', function($scope, $http) {
    $scope.submitValue = function () {
      $http.put('/update/scheduleStartTime', $scope.form).
        success(function(data) {
          $scope.banner = data
        });
    };

});
// controller for Update Status Code
app.controller('statusCode', function($scope, $http) {
  $scope.submitValue = function () {
    $http.put('/update/statusCode', $scope.form).
      success(function(data) {
        $scope.banner = data
      });
  };
});
//controller for Valuation End Date
app.controller('valuationEnd', function($scope, $http) {
  $scope.submitValue = function () {
    $http.put('/update/valuationEnd', $scope.form).
      success(function(data) {
        $scope.banner = data
      });
  };
});
//controller for Valuation Start time
app.controller('valuationStart', function($scope, $http) {
  $scope.submitValue = function () {
    $http.put('/update/valuationStart', $scope.form).
      success(function(data) {
        $scope.banner = data
      });
  };
});
//controller for SLA Date and Time by Audit
app.controller('sla_by_audit', function($scope, $http) {
  $scope.submitValue = function () {
    $http.put('/update/sla_by_audit', $scope.form).
      success(function(data) {
        $scope.banner = JSON.stringify(data, null, 2);
      });
  };
});
//controller for SLA Date and Time by run name
app.controller('sla_by_runname', function($scope, $http) {
  $scope.submitValue = function () {
    $http.put('/update/sla_by_runname', $scope.form).
      success(function(data) {
        $scope.banner = JSON.stringify(data, null, 2);
      });
  };
});
//controller for  Historical SLA Date and Time
app.controller('histoy_SLA', function($scope, $http) {
  $scope.submitValue = function () {
    $http.put('/update/histoy_SLA', $scope.form).
      success(function(data) {
        $scope.banner = data
      });
  };
});
//controller for Run Status Code by Run Name and Group Number
app.controller('status_name_grpNumder', function($scope, $http) {
  $scope.submitValue = function () {
    $http.put('/update/status_name_grpNumder', $scope.form).
      success(function(data) {
        $scope.banner = data
      });
  };
});
//controller for Run Status Code by Run Name and Driver Step Detail ID
app.controller('status_name_dtlID', function($scope, $http) {
  $scope.submitValue = function () {
    $http.put('/update/status_name_dtlID', $scope.form).
      success(function(data) {
        $scope.banner = data
      });
  };
});
//controller for Active Step Indicator by Driver Step ID
app.controller('active_step_indicator_stepID', function($scope, $http) {
  $scope.submitValue = function () {
    $http.put('/update/active_step_indicator_stepID', $scope.form).
      success(function(data) {
        $scope.banner = data
      });
  };
});
//controller for Update Active Step Indicator by Run Name and Driver Step ID
app.controller('active_step_indicator_runName_stepID', function($scope, $http) {
  $scope.submitValue = function () {
    $http.put('/update/active_step_indicator_runName_stepID', $scope.form).
      success(function(data) {
        $scope.banner = data
      });
  };
});
//controller for Update Active Step Indicator by Run Name
app.controller('active_step_indicator_runName', function($scope, $http) {
  $scope.submitValue = function () {
    $http.put('/update/active_step_indicator_runName', $scope.form).
      success(function(data) {
        $scope.banner = data
      });
  };
});
//controller for Update Active Step Indicator by Run Name and Group Number
app.controller('active_step_indicator_runName_grpNumber', function($scope, $http) {
  $scope.submitValue = function () {
    $http.put('/update/active_step_indicator_runName_grpNumber', $scope.form).
      success(function(data) {
        $scope.banner = data
      });
  };
});
