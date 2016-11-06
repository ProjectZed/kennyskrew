//controller for Update Schedule Start time
app.controller('scheduleTime', function($scope) {
    $scope.drv_step = "";
    $scope.auditId = "";
    $scope.sche_start = "";
    $scope.submitValue = function () {
      $scope.banner = "You have successfully executed: " + $scope.drv_step;
    };
});
// controller for Update Status Code
app.controller('statusCode', function($scope) {
    $scope.runName = "";
    $scope.auditId = "";
    $scope.Status = "";
    $scope.submitValue = function () {
      $scope.banner = "You have successfully executed: " + $scope.runName;
    };
});
//controller for Valuation End Date
app.controller('valuationEnd', function($scope) {
    $scope.runName = "";
    $scope.auditId = "";
    $scope.valEnd = "";
    $scope.submitValue = function () {
      $scope.banner = "You have successfully executed: " + $scope.runName;
    };
});
//controller for Valuation Start time
app.controller('valuationStart', function($scope) {
    $scope.runName = "";
    $scope.auditId = "";
    $scope.valStart = "";
    $scope.submitValue = function () {
      $scope.banner = "You have successfully executed: " + $scope.runName;
    };
});
//controller for SLA Date and Time by Audit
app.controller('sla_by_audit', function($scope) {
    $scope.sla_dt = "";
    $scope.sla_time = "";
    $scope.auditId = "";
    $scope.perf_dtl = "";
    $scope.submitValue = function () {
      $scope.banner = "You have successfully executed: " + $scope.sla_dt;
    };
});
//controller for SLA Date and Time by run name
app.controller('sla_by_runname', function($scope) {
    $scope.sla_time = "";
    $scope.runName = "";
    $scope.submitValue = function () {
      $scope.banner = "You have successfully executed: " + $scope.sla_time;
    };
});
//controller for  Historical SLA Date and Time
app.controller('histoy_SLA', function($scope) {
    $scope.runName = "";
    $scope.grp_number = "";
    $scope.step_ind = "";
    $scope.submitValue = function () {
      $scope.banner = "You have successfully executed: " + $scope.runName;
    };
});
//controller for Run Status Code by Run Name and Group Number
app.controller('status_name_grpNumder', function($scope) {
    $scope.runName = "";
    $scope.grp_number = "";
    $scope.Status = "";
    $scope.submitValue = function () {
      $scope.banner = "You have successfully executed: " + $scope.runName;
    };
});
//controller for Run Status Code by Run Name and Driver Step Detail ID
app.controller('status_name_dtlID', function($scope) {
    $scope.runName = "";
    $scope.dtl_id = "";
    $scope.Status = "";
    $scope.submitValue = function () {
      $scope.banner = "You have successfully executed: " + $scope.runName;
    };
});
//controller for Active Step Indicator by Driver Step ID
app.controller('active_step_indicator_stepID', function($scope) {
    $scope.drvr_step_id = "";
    $scope.actv_step_ind = "";
    $scope.submitValue = function () {
      $scope.banner = "You have successfully executed: " + $scope.drvr_step_id;
    };
});
//controller for Update Active Step Indicator by Run Name and Driver Step ID
app.controller('active_step_indicator_runName_stepID', function($scope) {
    $scope.runName = "";
    $scope.drvr_step_id = "";
    $scope.actv_step_ind = "";
    $scope.submitValue = function () {
      $scope.banner = "You have successfully executed: " + $scope.runName;
    };
});
app.controller('', function($scope) {
    $scope.driverStep = "";
    $scope.auditId = "";
    $scope.scheduleStart = "";
    $scope.getValue = function () {
      $scope.banner = "You have successfully executed: " + $scope.driverStep;
    };
});
app.controller('', function($scope) {
    $scope.driverStep = "";
    $scope.auditId = "";
    $scope.scheduleStart = "";
    $scope.getValue = function () {
      $scope.banner = "You have successfully executed: " + $scope.driverStep;
    };
});
