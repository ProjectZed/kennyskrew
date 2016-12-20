//-----------------------------------------------------------------------------
// UPDATE controller
//-----------------------------------------------------------------------------
//controller for Update Schedule Start time
app.controller('scheduleStartTime', function($scope, $http) {
    //exec button
    hideButton(permission);

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

    $scope.urgentExec = function () {
      var r = confirm("Are you sure want to update?");
      if (r == true) {
        var input = {
          runName : runname.name,
          auditId : aid.audit,
          sche_start : $scope.sche_start
        }
        $http.put('/update/scheduleStartTime', input).success(function(data) {
          $scope.banner = JSON.stringify(data, null, 2);
        });
        return true;
      } else {
        return false;
      }
    };
});

// controller for Update Status Code
app.controller('statusCode', function($scope, $http) {
  hideButton(permission);
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

  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
      var input = {
        runName : runname.name,
        auditId : aid.audit,
        statusCode : $scope.Status
      }
      $http.put('/update/statusCode', input).
        success(function(data) {
          $scope.banner = JSON.stringify(data, null, 2);;
      });
        return true;
    } else {
        return false;
    }
  };
});

//controller for Valuation End Date
app.controller('valuationEnd', function($scope, $http) {
  hideButton(permission);
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

  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
      var input = {
        runName : runname.name,
        auditId : aid.audit,
        valEnd : $scope.valEnd
      }
    $http.put('/update/valuationEnd', input).
      success(function(data) {
        $scope.banner = JSON.stringify(data, null, 2);
      });
    }
  };
});
//controller for Valuation Start time
app.controller('valuationStart', function($scope, $http) {
  hideButton(permission);

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

  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
      var input = {
        runName : runname.name,
        auditId : aid.audit,
        valStart : $scope.valStart
      }
      $http.put('/update/valuationStart', input).
      success(function(data) {
        $scope.banner = JSON.stringify(data, null, 2);
      });
    }
  };
});

//DEMO controller for SLA Date and Time by Audit
app.controller('sla_by_audit', function($scope, $http) {
  hideButton(permission);

  var aid;
  $http.get('/get/audit_id_driverschedule').success(function(data) {
    $scope.aids = data;
    $scope.auditId= data[0];
    aid = { audit : data[0].audit_id }
  });

  $scope.selectedValue = function(x) {
    aid = { audit : x.audit_id }
  }

  $scope.urgentExec = function () {
      var r = confirm("Are you sure want to update?");
      if (r == true) {
        var input = {
          auditId : aid.audit,
          sla_dt : $scope.sla_dt,
          sla_time : $scope.sla_time
        }
        $http.put('/update/sla_by_audit', input).success(function(data) {
          $scope.banner = JSON.stringify(data, null, 2);
        });
        return true;
      } else {
        return false;
      }
    };
});

//controller for SLA Date and Time by run name
app.controller('sla_by_runname', function($scope, $http) {
  hideButton(permission);

  var runname;
  $http.get('/get/runname_driverschedule').success(function(data) {
    $scope.runnames = data;
    $scope.runName= data[0];
    runname = { name : data[0].run_nme };
  });

  $scope.selectedValue = function(x) {
    runname = { name : x.run_nme };
  }

  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
      var input = {
        runName : runname.name,
        sla_dt : $scope.sla_dt,
        sla_time : $scope.sla_time
      }
      console.log(input);
      $http.put('/update/sla_by_runname', input).
        success(function(data) {
          $scope.banner = JSON.stringify(data, null, 2) + "\n ...";
        });
        return true;
      } else {
        return false;
      }
    };
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

//controller for Run Status Code by Run Name and Group Number
app.controller('status_name_grpNumder', function($scope, $http) {
  hideButton(permission);
  /* drop down */
  var val, foo;
  $http.get('/get/runname_driverstepdetail').
  success(function(data) {
    $scope.items = data;
    $scope.runName= $scope.items[0];
  });
  $scope.selectedValue = function(x) {
    val = { runName : x.run_name }
    $http.post('/get/grpNumber_driverstepdetail', val).
    success(function(data) {
      $scope.units = data;
      $scope.grpNumber= $scope.units[0];
    });
  }
  $scope.selectedValue2 = function(y) {
    foo = { grpNumber : y.grp_nbr }
  }
  /* end */

  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
      var input = {
        runName : val.runName,
        grpNumber : foo.grpNumber,
        statusCode : $scope.statusCode
      }
    $http.put('/update/status_name_grpNumder', input).
      success(function(data) {
        $scope.banner = JSON.stringify(data, null, 2) + "\n ...";
      });
      return true;
    } else {
      return false;
    }
  };
});
//controller for Run Status Code by Run Name and Driver Step Detail ID
app.controller('status_name_dtlID', function($scope, $http) {
  hideButton(permission);
  /* drop down */
  var val, foo;
  $http.get('/get/runname_driverstepdetail').
  success(function(data) {
    $scope.items = data;
    $scope.runName= $scope.items[0];
  });
  $scope.selectedValue = function(x) {
    val = { runName : x.run_name }
    $http.post('/get/detailID_driverstepdetail', val).
    success(function(data) {
      $scope.units = data;
      $scope.detailID= $scope.units[0];
    });
  }
  $scope.selectedValue2 = function(y) {
    foo = { detailID : y.drvr_step_dtl_id }
  }
  /* end */

  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
      var input = {
        runName : val.runName,
        detailID : foo.detailID,
        statusCode : $scope.statusCode
      }
      $http.put('/update/status_name_dtlID', input).
        success(function(data) {
          $scope.banner = JSON.stringify(data, null, 2);
        });
        return true;
      } else {
        return false;
      }
  };
});
//controller for Active Step Indicator by Driver Step ID
app.controller('active_step_indicator_stepID', function($scope, $http) {
  hideButton(permission);
  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
    $http.put('/update/active_step_indicator_stepID', $scope.form).
      success(function(data) {
        $scope.banner = JSON.stringify(data, null, 2);
      });
    }
  };
});
//controller for Update Active Step Indicator by Run Name and Driver Step ID
app.controller('active_step_indicator_runName_stepID', function($scope, $http) {
  hideButton(permission);
  /* drop down */
  var val, foo;
  $http.get('/get/runname_driverstep').
  success(function(data) {
    $scope.items = data;
    $scope.runName= $scope.items[0];
  });
  $scope.selectedValue = function(x) {
    val = { runName : x.run_nme }
    $http.post('/get/detailID_driverstep', val).
    success(function(data) {
      $scope.units = data;
      $scope.driverStepID= $scope.units[0];
    });
  }
  $scope.selectedValue2 = function(y) {
    foo = { stepID : y.drvr_step_id }
  }
  /* end */

  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
      var input = {
        runName : val.runName,
        stepID : foo.stepID,
        actv_step_ind : $scope.actv_step_ind
      }
    $http.put('/update/active_step_indicator_runName_stepID', input).
      success(function(data) {
        $scope.banner = JSON.stringify(data, null, 2);
      });
    }
  };
});
//controller for Update Active Step Indicator by Run Name
app.controller('active_step_indicator_runName', function($scope, $http) {
  hideButton(permission);
  /* drop down */
  var val;
  $http.get('/get/runname_driverstep').
  success(function(data) {
    $scope.items = data;
    $scope.runName= $scope.items[0];
  });
  $scope.selectedValue = function(x) {
    val = { runName : x.run_nme }
  }
  /* end */
  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
      var input = {
        runName : val.runName,
        actv_step_ind : $scope.actv_step_ind
      }
      $http.put('/update/active_step_indicator_runName', input).
        success(function(data) {
          $scope.banner = JSON.stringify(data, null, 2) + "\n ...";
      });
    }
  };
});
//controller for Update Active Step Indicator by Run Name and Group Number
app.controller('active_step_indicator_runName_grpNumber', function($scope, $http) {
  hideButton(permission);
  /* drop down */
  var val, foo;
  $http.get('/get/runname_driverstep').
  success(function(data) {
    $scope.items = data;
    $scope.runName= $scope.items[0];
  });
  $scope.selectedValue = function(x) {
    val = { runName : x.run_nme }
    $http.post('/get/grpNumber_driverstep', val).
    success(function(data) {
      $scope.units = data;
      $scope.grpNumber= $scope.units[0];
    });
  }
  $scope.selectedValue2 = function(y) {
    foo = { grpNumber : y.grp_nbr }
  }
  /* end */

  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
      var input = {
        runName : val.runName,
        grpNumber : foo.grpNumber,
        actv_step_ind : $scope.actv_step_ind
      }
      $http.put('/update/active_step_indicator_runName_grpNumber', input).
        success(function(data) {
          $scope.banner = JSON.stringify(data, null, 2);
      });
    }
  };
});