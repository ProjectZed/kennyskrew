//-----------------------------------------------------------------------------
// UPDATE SCHEDULE controller
//-----------------------------------------------------------------------------
//controller for Update Schedule Start time
app.controller('scheduleStartTime', function($scope, $http) {
  //exec button
  hideButton(permission);
  hideBanner();

  /* drop down */
  var runmame, aid;
  $http.get('/get/runname_driverschedule').success(function(data) {
    $scope.items = data;
    $scope.runName= data[0];
    runname = { name : data[0].run_nme };
    $http.post('/get/audit_id_driverschedule', runname).success(function(data2) {
      $scope.units = data2;
      $scope.auditId= data2[0];
      aid = { audit : data2[0].audit_id }
    });
  });

  $scope.selectedValue = function(x) {
    runmame = { name : x.run_nme }
    $http.post('/get/audit_id_driverschedule', runmame).success(function(data) {
      $scope.units = data;
      $scope.auditId= data[0];
    });
  }

  $scope.selectedValue2 = function(y) {
    aid = { audit : y.audit_id }
  }
  /* end */

  $scope.urgentExec = function(bool){
    var route ='/update/scheduleStartTime';
    var input = {
      runName : runname.name,
      auditId : aid.audit,
      sche_start : $scope.sche_start,
      isUrgent : bool
    }
    exec(route,input,$http,$scope);
  }
});

// controller for Update Status Code
app.controller('statusCode', function($scope, $http) {
  hideButton(permission);
  hideBanner();

  /* drop down */
  var runmame, aid;
  $http.get('/get/runname_driverschedule').success(function(data) {
    $scope.items = data;
    $scope.runName= data[0];
    runname = { name : data[0].run_nme };
    $http.post('/get/audit_id_driverschedule', runname).success(function(data2) {
      $scope.units = data2;
      $scope.auditId= data2[0];
      aid = { audit : data2[0].audit_id }
    });
  });
  $scope.selectedValue = function(x) {
    runmame = { name : x.run_nme }
    $http.post('/get/audit_id_driverschedule', runmame).success(function(data) {
      $scope.units = data;
      $scope.auditId= data[0];
    });
  }
  $scope.selectedValue2 = function(y) {
    aid = { audit : y.audit_id }
  }
  /* end */

  $scope.urgentExec = function(bool){
    var route ="/update/statusCode";
    var input = {
      runName : runname.name,
      auditId : aid.audit,
      statusCode : $scope.Status,
      isUrgent : bool
    }
    exec(route,input,$http,$scope);
  }
});

//controller for Valuation End Date
app.controller('valuationEnd', function($scope, $http) {
  hideButton(permission);
  hideBanner();

  /* drop down */
  var runmame, aid;
  $http.get('/get/runname_driverschedule').success(function(data) {
    $scope.items = data;
    $scope.runName= data[0];
    runname = { name : data[0].run_nme };
    $http.post('/get/audit_id_driverschedule', runname).success(function(data2) {
      $scope.units = data2;
      $scope.auditId= data2[0];
      aid = { audit : data2[0].audit_id }
    });
  });
  $scope.selectedValue = function(x) {
    runmame = { name : x.run_nme }
    $http.post('/get/audit_id_driverschedule', runmame).success(function(data) {
      $scope.units = data;
      $scope.auditId= data[0];
    });
  }
  $scope.selectedValue2 = function(y) {
    aid = { audit : y.audit_id }
  }
  /* end */

  $scope.urgentExec = function(bool){
    var route ="/update/valuationEnd";
    var input = {
      unName : runname.name,
      auditId : aid.audit,
      valEnd : $scope.valEnd,
      isUrgent : bool
    }
    exec(route,input,$http,$scope);
  }
});
//controller for Valuation Start time
app.controller('valuationStart', function($scope, $http) {
  hideButton(permission);
  hideBanner();

  /* drop down */
  var runmame, aid;
  $http.get('/get/runname_driverschedule').success(function(data) {
    $scope.items = data;
    $scope.runName= data[0];
    runname = { name : data[0].run_nme };
    $http.post('/get/audit_id_driverschedule', runname).success(function(data2) {
      $scope.units = data2;
      $scope.auditId= data2[0];
      aid = { audit : data2[0].audit_id }
    });
  });
  $scope.selectedValue = function(x) {
    runmame = { name : x.run_nme }
    $http.post('/get/audit_id_driverschedule', runmame).success(function(data) {
      $scope.units = data;
      $scope.auditId= data[0];
    });
  }
  $scope.selectedValue2 = function(y) {
    aid = { audit : y.audit_id }
  }
  /* end */

  $scope.urgentExec = function(bool){
    var route ='/update/valuationStart';
    var input = {
      runName : runname.name,
      auditId : aid.audit,
      valStart : $scope.valStart,
      isUrgent : bool
    }
    exec(route,input,$http,$scope);
  }
});

//DEMO controller for SLA Date and Time by Audit
app.controller('sla_by_audit', function($scope, $http) {
  hideButton(permission);
  hideBanner();

  var aid;
  $http.get('/get/audit_id_driverschedule').success(function(data) {
    $scope.aids = data;
    $scope.auditId= data[0];
    aid = { audit : data[0].audit_id }
  });

  $scope.selectedValue = function(x) {
    aid = { audit : x.audit_id }
  }

  $scope.urgentExec = function(bool){
    var route ='/update/sla_by_audit';
    var input = {
      auditId : aid.audit,
      sla_dt : $scope.sla_dt,
      sla_time : $scope.sla_time,
      isUrgent : bool
    }
    exec(route,input,$http,$scope);
  }
});

//controller for SLA Date and Time by run name
app.controller('sla_by_runname', function($scope, $http) {
  hideButton(permission);
  hideBanner();

  var runname;
  $http.get('/get/runname_driverschedule').success(function(data) {
    $scope.runnames = data;
    $scope.runName= data[0];
    runname = { name : data[0].run_nme };
  });

  $scope.selectedValue = function(x) {
    runname = { name : x.run_nme };
  }

  $scope.urgentExec = function(bool){
    var route ='/update/sla_by_runname';
    var input = {
      runName : runname.name,
      sla_dt : $scope.sla_dt,
      sla_time : $scope.sla_time,
      isUrgent : bool
    }
    exec(route,input,$http,$scope);
  }
});
//controller for  Historical SLA Date and Time
// app.controller('histoy_SLA', function($scope, $http) {
//   $scope.urgentExec = function () {
//     var r = confirm("Are you sure want to update?");
//     if (r == true) {
//     $http.put('/update/histoy_SLA', $scope.form).
//       success(function(data) {
//         $scope.banner = JSON.stringify(data, null, 2);
//       });
//     }
//   };
// });


//-----------------------------------------------------------------------------
// UPDATE STEP DETAIL controller
//-----------------------------------------------------------------------------
//controller for Run Status Code by Run Name and Group Number
app.controller('status_name_grpNumder', function($scope, $http) {
  hideButton(permission);
  hideBanner();

  /* drop down */
  var runname, groupNumber;
  $http.get('/get/runname_driverstepdetail').success(function(data) {
    $scope.items = data;
    $scope.runName= data[0];
    runname = { runName : data[0].run_name };
    $http.post('/get/grpNumber_driverstepdetail', runname).success(function(data2) {
      $scope.units = data2;
      $scope.grpNumber= $scope.units[0];
      groupNumber = { grpNumber : data2[0].grp_nbr }
    });
  });

  $scope.selectedValue = function(x) {
    runname = { runName : x.run_name }
    $http.post('/get/grpNumber_driverstepdetail', runname).success(function(data) {
      $scope.units = data;
      $scope.grpNumber= $scope.units[0];
      groupNumber = { grpNumber : data[0].grp_nbr }
    });
  }
  $scope.selectedValue2 = function(y) {
    groupNumber = { grpNumber : y.grp_nbr }
  }
  /* end */

  $scope.urgentExec = function(bool){
    var route ='/update/status_name_grpNumder';
    var input = {
      runName : runname.runName,
      grpNumber : groupNumber.grpNumber,
      statusCode : $scope.statusCode,
      isUrgent : bool
    }
    exec(route,input,$http,$scope);
  }
});

//controller for Run Status Code by Run Name and Driver Step Detail ID
app.controller('status_name_dtlID', function($scope, $http) {
  hideButton(permission);
  hideBanner();

  /* drop down */
  var runname, detailID;
  $http.get('/get/runname_driverstepdetail').success(function(data) {
    $scope.items = data;
    $scope.runName= data[0];
    runname = { runName : data[0].run_name };
    $http.post('/get/detailID_driverstepdetail', runname).success(function(data2) {
      $scope.units = data2;
      $scope.detailID= $scope.units[0];
      detailID = { detailID : data2[0].drvr_step_dtl_id }
    });
  });

  $scope.selectedValue = function(x) {
    runname = { runName : x.run_name }
    $http.post('/get/detailID_driverstepdetail', runname).success(function(data) {
      $scope.units = data;
      $scope.detailID= $scope.units[0];
      detailID = { detailID : data.drvr_step_dtl_id }
    });
  }
  $scope.selectedValue2 = function(y) {
    detailID = { detailID : y.drvr_step_dtl_id }
  }

  $scope.urgentExec = function(bool){
    var route ="/update/status_name_dtlID";
    var input = {
      runName : runname.runName,
      detailID : detailID.detailID,
      statusCode : $scope.statusCode,
      isUrgent : bool
    }
    exec(route,input,$http,$scope);
  }
});

function exec(route, input,$http,$scope) {
  var r = confirm("Are you sure want to update?");
  if (r == true) {
    $http.put(route, input).
    success(function(data) {
      $scope.banner = JSON.stringify(data, null, 2);
      showBanner();
    });

    return true;
  } else {
    return false;
  }
}
//-----------------------------------------------------------------------------
// UPDATE STEP controller
//-----------------------------------------------------------------------------
//controller for Active Step Indicator by Driver Step ID
app.controller('active_step_indicator_stepID', function($scope, $http) {
  hideButton(permission);
  hideBanner();

  var sid;
  $http.get('/get/detailID_driverstep').success(function(data) {
    $scope.items = data;
    $scope.drvr_step_id= $scope.items[0];
    sid = { stepID : data[0].drvr_step_id }
  });

  $scope.selectedValue = function(x) {
    sid = { stepID : x.drvr_step_id }
  }

  $scope.urgentExec = function(bool){
    var route ="/update/active_step_indicator_stepID";
    var input = {
      drvr_step_id : sid.stepID,
      actv_step_ind : $scope.actv_step_ind,
      isUrgent : bool
    }
    exec(route,input,$http,$scope);
  }
});
//controller for Update Active Step Indicator by Run Name and Driver Step ID
app.controller('active_step_indicator_runName_stepID', function($scope, $http) {
  hideButton(permission);
  hideBanner();

  /* drop down */
  var runname, sid;
  $http.get('/get/runname_driverstep').success(function(data) {
    $scope.items = data;
    $scope.runName= $scope.items[0];
    runname = { runName : data[0].run_nme }
    $http.post('/get/detailID_driverstep', runname).success(function(data2) {
      $scope.units = data2;
      $scope.driverStepID= $scope.units[0];
      sid = { stepID : data2[0].drvr_step_id }
    });
  });

  $scope.selectedValue = function(x) {
    runname = { runName : x.run_nme }
    $http.post('/get/detailID_driverstep', runname).success(function(data) {
      $scope.units = data;
      $scope.driverStepID= $scope.units[0];
      sid = { stepID : data[0].drvr_step_id }
    });
  }

  $scope.selectedValue2 = function(y) {
    sid = { stepID : y.drvr_step_id }
  }
  /* end */

  $scope.urgentExec = function(bool){
    var route ="/update/active_step_indicator_runName_stepID";
    var input = {
      runName : runname.runName,
      stepID : sid.stepID,
      actv_step_ind : $scope.actv_step_ind,
      isUrgent : bool
    }
    exec(route,input,$http,$scope);
  }

});

//controller for Update Active Step Indicator by Run Name
app.controller('active_step_indicator_runName', function($scope, $http) {
  hideButton(permission);
  hideBanner();

  /* drop down */
  var runname;
  $http.get('/get/runname_driverstep').success(function(data) {
    $scope.items = data;
    $scope.runName= $scope.items[0];
    runname = { runName : data[0].run_nme }
  });

  $scope.selectedValue = function(x) {
    runname = { runName : x.run_nme }
  }
  /* end */
  $scope.urgentExec = function(bool){
    var route ="/update/active_step_indicator_runName";
    var input = {
      runName : runname.runName,
      actv_step_ind : $scope.actv_step_ind,
      isUrgent : bool
    }
    exec(route,input,$http,$scope);
  }
});

//controller for Update Active Step Indicator by Run Name and Group Number
app.controller('active_step_indicator_runName_grpNumber', function($scope, $http) {
  hideButton(permission);
  hideBanner();

  /* drop down */
  var runname, groupNumber;
  $http.get('/get/runname_driverstep').success(function(data) {
    $scope.items = data;
    $scope.runName= $scope.items[0];
    runname = { runName : data[0].run_nme }
    $http.post('/get/grpNumber_driverstep', runname).success(function(data2) {
      $scope.units = data2;
      $scope.grpNumber= $scope.units[0];
      groupNumber = { grpNumber : data2[0].grp_nbr }
    });
  });

  $scope.selectedValue = function(x) {
    runname = { runName : x.run_nme }
    $http.post('/get/grpNumber_driverstep', runname).success(function(data) {
      $scope.units = data;
      $scope.grpNumber= $scope.units[0];
      groupNumber = { grpNumber : data.grp_nbr }
    });
  }

  $scope.selectedValue2 = function(y) {
    groupNumber = { grpNumber : y.grp_nbr }
  }
  /* end */

  $scope.urgentExec = function(bool){
    var route ="/update/active_step_indicator_runName_grpNumber";
    var input = {
      runName : runname.runName,
      grpNumber : groupNumber.grpNumber,
      actv_step_ind : $scope.actv_step_ind,
      isUrgent : bool
    }
    exec(route,input,$http,$scope);
  }
});
