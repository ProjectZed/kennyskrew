app.controller('environmentCtrl', function($scope) {
  $scope.environments = ["Development", "Test", "Quality Assurance", "Product"];
  $scope.selectedEnvironment = "Development";
});

app.controller('loginCtrl', function($scope, $http) {
  $scope.submitLogin = function () {
    console.log($scope.form);
    //var env = $('#env').find(":selected").text();
    //console.log(env);
    $http.post('/login', $scope.form).
    success(function(data) {
      //go to homepage.html
      console.log(data);
      window.location.href="/";
    }).error(function(error){
      document.getElementById("error-message").innerHTML = error;
      if(error === "Password Incorrect"){
        document.getElementById("password").style.borderColor = "red";
        console.log('password');
      }else if(error === "No Such User"){
        document.getElementById("username").style.borderColor = "red";
        console.log('username');
      }else if( error === "Both username and password are incorrect."){
        document.getElementById("username").style.borderColor = "red";
        document.getElementById("password").style.borderColor = "red";
        console.log('both username and password');
      }
    });
  }
});

function removeRedBorder(element){
    document.getElementById(element).style.borderColor = "#EBE9ED";
}

app.controller('navController', function($scope, $http) {
    $scope.logout = function () {
      if(confirm("Are you sure want to exit?")){
        $http.get('/logout').
        success(function(data) {
          console.log('logout success');
          window.location.reload();
        });;
      }
    };
});

//-----------------------------------------------------------------------------
// UPDATE controller
//-----------------------------------------------------------------------------
//controller for Update Schedule Start time
app.controller('scheduleStartTime', function($scope, $http) {
    $scope.urgentExec = function () {
      var r = confirm("Are you sure want to update?");
      if (r == true) {
        $http.put('/update/scheduleStartTime', $scope.form).
        success(function(data) {
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
  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
    $http.put('/update/statusCode', $scope.form).
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
  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
    $http.put('/update/valuationEnd', $scope.form).
      success(function(data) {
        $scope.banner = JSON.stringify(data, null, 2);
      });
    }
  };
});
//controller for Valuation Start time
app.controller('valuationStart', function($scope, $http) {
  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
    $http.put('/update/valuationStart', $scope.form).
      success(function(data) {
        $scope.banner = JSON.stringify(data, null, 2);
      });
    }
  };
});

//DEMO controller for SLA Date and Time by Audit
app.controller('sla_by_audit', function($scope, $http) {
  $scope.urgentExec = function () {
      var r = confirm("Are you sure want to update?");
      if (r == true) {
      $http.put('/update/sla_by_audit', $scope.form).
        success(function(data) {
          $scope.banner = JSON.stringify(data, null, 2);
        });
        return true;
      } else {
        return false;
      }
    }
});

//controller for SLA Date and Time by run name
app.controller('sla_by_runname', function($scope, $http) {
  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
    $http.put('/update/sla_by_runname', $scope.form).
      success(function(data) {
        $scope.banner = JSON.stringify(data, null, 2);
      });
    }
  };
});
//controller for  Historical SLA Date and Time
app.controller('histoy_SLA', function($scope, $http) {
  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
    $http.put('/update/histoy_SLA', $scope.form).
      success(function(data) {
        $scope.banner = JSON.stringify(data, null, 2);
      });
    }
  };
});
//controller for Run Status Code by Run Name and Group Number
app.controller('status_name_grpNumder', function($scope, $http) {
  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
    $http.put('/update/status_name_grpNumder', $scope.form).
      success(function(data) {
        $scope.banner = JSON.stringify(data, null, 2);
      });
    }
  };
});
//controller for Run Status Code by Run Name and Driver Step Detail ID
app.controller('status_name_dtlID', function($scope, $http) {
  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
    $http.put('/update/status_name_dtlID', $scope.form).
      success(function(data) {
        $scope.banner = JSON.stringify(data, null, 2);
      });
    }
  };
});
//controller for Active Step Indicator by Driver Step ID
app.controller('active_step_indicator_stepID', function($scope, $http) {
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
  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
    $http.put('/update/active_step_indicator_runName_stepID', $scope.form).
      success(function(data) {
        $scope.banner = JSON.stringify(data, null, 2);
      });
    }
  };
});
//controller for Update Active Step Indicator by Run Name
app.controller('active_step_indicator_runName', function($scope, $http) {
  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
    $http.put('/update/active_step_indicator_runName', $scope.form).
      success(function(data) {
        $scope.banner = JSON.stringify(data, null, 2);
      });
    }
  };
});
//controller for Update Active Step Indicator by Run Name and Group Number
app.controller('active_step_indicator_runName_grpNumber', function($scope, $http) {
  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
    $http.put('/update/active_step_indicator_runName_grpNumber', $scope.form).
      success(function(data) {
        $scope.banner = JSON.stringify(data, null, 2);
      });
    }
  };
});

//-----------------------------------------------------------------------------
// DELETE controllers
//-----------------------------------------------------------------------------
//controller for Delete Driver Schedule
app.controller('Dl_Driver_Schedule', function($scope, $http) {
    $scope.urgentExec = function () {
      $http.put('/delete/driverSchedule', $scope.form).
        success(function(data) {
          $scope.banner = data
        });
    };
});
//controller for Delete Driver Step
app.controller('Dl_Driver_Step_RunName_GrpNbr', function($scope, $http) {
    $scope.urgentExec = function () {
      $http.put('/delete/Driver_Step_RunName_GrpNbr', $scope.form).
        success(function(data) {
          $scope.banner = data
        });
    };
});
//controller for Delete Driver Step
app.controller('Dl_Driver_Step_RunName', function($scope, $http) {
    $scope.urgentExec = function () {
      $http.put('/delete/Driver_Step_RunName', $scope.form).
        success(function(data) {
          $scope.banner = data
        });
    };
});
//controller for Delete Driver Step
app.controller('Dl_Driver_Step_RunName_Sid', function($scope, $http) {
    $scope.urgentExec = function () {
      $http.put('/delete/Driver_Step_RunName_Sid', $scope.form).
        success(function(data) {
          $scope.banner = data
        });
    };
});
//controller for Delete Driver Step Detail
app.controller('Dl_Driver_Step_Detail_RunName', function($scope, $http) {
    $scope.urgentExec = function () {
      $http.put('/delete/Driver_Step_RunName_Sid', $scope.form).
        success(function(data) {
          $scope.banner = data
        });
    };
});

//-----------------------------------------------------------------------------
// ADD controllers
//-----------------------------------------------------------------------------
//controller for Add Driver Scedule
app.controller('DriverSchedule', function($scope, $http) {
    $scope.urgentExec = function () {
      $http.put('/add/DriverSchedule', $scope.form).
        success(function(data) {
          $scope.banner = data
        });
    };
});

//controller for Add Driver Step
app.controller('DriverStep', function($scope, $http) {
    $scope.urgentExec = function () {
      $http.put('/add/DriverStep', $scope.form).
        success(function(data) {
          $scope.banner = data
        });
    };
});
