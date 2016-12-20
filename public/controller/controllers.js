app.controller('macroCtrl', function($scope){
  //console.log(permission);
  //
});

app.controller('environmentCtrl', function($scope) {
  $scope.environments = ["Development", "Test", "Quality Assurance", "Product"];
  $scope.selectedEnvironment = "Development";
});

app.controller('loginCtrl', function($scope, $http) {
  document.getElementById('username').style.borderColor = "#EBE9ED";
  document.getElementById('password').style.borderColor = "#EBE9ED";

  $scope.submitLogin = function () {
<<<<<<< HEAD
<<<<<<< HEAD
    //console.log($scope.form);
=======
    document.getElementById('username').style.borderColor = "#EBE9ED";
    document.getElementById('password').style.borderColor = "#EBE9ED";
    console.log($scope.form);
>>>>>>> fixed username undefined, issue where both username and password are empty. devided to remain red border of password
    //var env = $('#env').find(":selected").text();
    //console.log(env);
<<<<<<< HEAD
=======
    //console.log($scope.form);
    //var env = $('#env').find(":selected").text();
    //console.log(env);
>>>>>>> center login page and fixed error
    if($scope.form.username === 'undefined' ||
        $scope.form.password === 'undefined' ||
        $scope.form.username.length == 0 ||
        !$scope.form.username.trim() ||
        $scope.form.password.length == 0 ||
        !$scope.form.password.trim()){

        if(($scope.form.username === 'undefined' ||
            $scope.form.username.length == 0 ||
            !$scope.form.username.trim())
            &&
          ($scope.form.password === 'undefined' ||
          $scope.form.password.length == 0 ||
          !$scope.form.password.trim())){
            redBorder('username');
            redBorder('password');
            errorOut('Empty Username and Password');
          }else if($scope.form.username === 'undefined' ||
              $scope.form.username.length == 0 ||
              !$scope.form.username.trim()){
              redBorder('username');
              errorOut('Empty Username');
          }else if($scope.form.password === 'undefined' ||
              $scope.form.password.length == 0 ||
              !$scope.form.password.trim()){
              redBorder('password');
              errorOut('Empty Password');
          }
        }else{
          $http.post('/login', $scope.form).
            success(function(data) {
              //go to homepage.html
              if(data === "Password Incorrect"){
                redBorder('password');
                errorOut("Username doesn't match password.");
                //console.log('password');
              }else if(data === "No Such User"){
                redBorder('username');
                errorOut("Username doesn't exist.");
                //console.log('username');
              }else if( data === "Both username and password are incorrect."){
                redBorder('username');
                redBorder('password');
                errorOut(error);
                //console.log('both username and password');
<<<<<<< HEAD
<<<<<<< HEAD
              }else{
                $scope.user = data
=======
              }else if( data === "success"){
>>>>>>> center login page and fixed error
=======
              }else{
                $scope.user = data
>>>>>>> hide exec button according to permission
                window.location.href="/";
              }
            });
          }
        };
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD

=======
    $http.post('/login', $scope.form).
    success(function(data) {
      //go to homepage.html
      console.log(data);
      window.location.href="/";
    }).error(function(error){
      if(error === "Password Incorrect"){
        document.getElementById("password").style.borderColor = "red";
        document.getElementById("error-message").innerHTML = "Username doesn't match password.";
        console.log('password');
      }else if(error === "No Such User"){
        document.getElementById("username").style.borderColor = "red";
        document.getElementById("error-message").innerHTML = "Username doesn't exist.";
        console.log('username');
      }else if( error === "Both username and password are incorrect."){
        document.getElementById("username").style.borderColor = "red";
        document.getElementById("password").style.borderColor = "red";
        document.getElementById("error-message").innerHTML = error;
        console.log('both username and password');
>>>>>>> update login border
=======
>>>>>>> center login page and fixed error
=======

>>>>>>> hide exec button according to permission
      }
    );

<<<<<<< HEAD
=======

      }
    );

>>>>>>> not display PR when user is not admin
function errorOut(message){
  document.getElementById("error-message").innerHTML = message;
}

function redBorder(element){
    document.getElementById(element).style.borderColor = "red";
}
function removeRedBorder(element){
    document.getElementById(element).style.borderColor = "#EBE9ED";
}

function hideButton(permission){
  var exec = document.getElementById('exec');
  var urgentExec = document.getElementById('urgentExec');
  if(permission != "administrator")
    urgentExec.style.display = "none";
  else
    exec.style.display = "none";
}

=======
>>>>>>> update for driver schedule
app.controller('navController', function($scope, $http) {
  if(permission != "administrator")
    document.getElementById('PR').style.display = "none";

    $scope.logout = function () {
      if(confirm("Are you sure want to exit?")){
        $http.get('/logout').
        success(function(data) {
          //console.log('logout success');
          window.location.reload();
        });;
      }
    };
});


//-----------------------------------------------------------------------------
<<<<<<< HEAD
// UPDATE controller
//-----------------------------------------------------------------------------
//controller for Update Schedule Start time
app.controller('scheduleStartTime', function($scope, $http) {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    //exec button
    hideButton(permission);

    /* drop down */
    var val, foo;
    $http.get('/get/runname_driverschedule').
=======
    var val, foo;
    $http.get('/get/driverSchedule').
>>>>>>> dropdown on first update macro
=======
=======
    //exec button
    hideButton(permission);

>>>>>>> hide exec button according to permission
    /* drop down */
    var val, foo;
    $http.get('/get/runname_driverschedule').
>>>>>>> done update macros
    success(function(data) {
      $scope.items = data;
      $scope.runName= $scope.items[0];
    });
<<<<<<< HEAD
<<<<<<< HEAD
    $scope.selectedValue = function(x) {
      val = { name : x.run_nme }
      $http.post('/get/audit_id_driverschedule', val).
=======

    $scope.selectedValue = function(x) {
      val = {
        name : x.run_nme
      }
      $http.post('/get/xyz', val).
>>>>>>> dropdown on first update macro
=======
    $scope.selectedValue = function(x) {
      val = { name : x.run_nme }
      $http.post('/get/audit_id_driverschedule', val).
>>>>>>> done update macros
      success(function(data) {
        $scope.units = data;
        $scope.auditId= $scope.units[0];
      });
    }
<<<<<<< HEAD
<<<<<<< HEAD
    $scope.selectedValue2 = function(y) {
      foo = { audit : y.audit_id }
    }
    /* end */
=======

=======
>>>>>>> done update macros
    $scope.selectedValue2 = function(y) {
      foo = { audit : y.audit_id }
    }
<<<<<<< HEAD
>>>>>>> dropdown on first update macro
=======
    /* end */
>>>>>>> done update macros

    $scope.urgentExec = function () {
      var r = confirm("Are you sure want to update?");
      if (r == true) {
        var input = {
          runName : val.name,
<<<<<<< HEAD
<<<<<<< HEAD
          auditId : foo.audit,
=======
          auditId : foo.ids,
>>>>>>> dropdown on first update macro
=======
          auditId : foo.audit,
>>>>>>> done update macros
          sche_start : $scope.sche_start
        }
        console.log(input);
        $http.put('/update/scheduleStartTime', input).
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
<<<<<<< HEAD
<<<<<<< HEAD
  hideButton(permission);
=======
>>>>>>> done update macros
=======
  hideButton(permission);
>>>>>>> hide exec button according to permission
  /* drop down */
  var val, foo;
  $http.get('/get/runname_driverschedule').
  success(function(data) {
    $scope.items = data;
    $scope.runName= $scope.items[0];
  });
  $scope.selectedValue = function(x) {
    val = { name : x.run_nme }
    $http.post('/get/audit_id_driverschedule', val).
    success(function(data) {
      $scope.units = data;
      $scope.auditId= $scope.units[0];
    });
  }
  $scope.selectedValue2 = function(y) {
    foo = { audit : y.audit_id }
  }
  /* end */

  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
      var input = {
        runName : val.name,
        auditId : foo.audit,
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
<<<<<<< HEAD
<<<<<<< HEAD
  hideButton(permission);
=======
>>>>>>> done update macros
=======
  hideButton(permission);
>>>>>>> hide exec button according to permission
  /* drop down */
  var val, foo;
  $http.get('/get/runname_driverschedule').
  success(function(data) {
    $scope.items = data;
    $scope.runName= $scope.items[0];
  });
  $scope.selectedValue = function(x) {
    val = { name : x.run_nme }
    $http.post('/get/audit_id_driverschedule', val).
    success(function(data) {
      $scope.units = data;
      $scope.auditId= $scope.units[0];
    });
  }
  $scope.selectedValue2 = function(y) {
    foo = { audit : y.audit_id }
  }
  /* end */

  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
      var input = {
        runName : val.name,
        auditId : foo.audit,
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
<<<<<<< HEAD
<<<<<<< HEAD
  hideButton(permission);
=======
>>>>>>> done update macros
=======
  hideButton(permission);
>>>>>>> hide exec button according to permission
  /* drop down */
  var val, foo;
  $http.get('/get/runname_driverschedule').
  success(function(data) {
    $scope.items = data;
    $scope.runName= $scope.items[0];
  });
  $scope.selectedValue = function(x) {
    val = { name : x.run_nme }
    $http.post('/get/audit_id_driverschedule', val).
    success(function(data) {
      $scope.units = data;
      $scope.auditId= $scope.units[0];
    });
  }
  $scope.selectedValue2 = function(y) {
    foo = { audit : y.audit_id }
  }
  /* end */

  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
      var input = {
        runName : val.name,
        auditId : foo.audit,
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
    };
});

//controller for SLA Date and Time by run name
app.controller('sla_by_runname', function($scope, $http) {
  hideButton(permission);
  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
      $http.put('/update/sla_by_runname', $scope.form).
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
<<<<<<< HEAD
<<<<<<< HEAD
  hideButton(permission);
=======
>>>>>>> done update macros
=======
  hideButton(permission);
>>>>>>> hide exec button according to permission
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
<<<<<<< HEAD
<<<<<<< HEAD
  hideButton(permission);
=======
>>>>>>> done update macros
=======
  hideButton(permission);
>>>>>>> hide exec button according to permission
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
<<<<<<< HEAD
<<<<<<< HEAD
  hideButton(permission);
=======
>>>>>>> done update macros
=======
  hideButton(permission);
>>>>>>> hide exec button according to permission
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
<<<<<<< HEAD
<<<<<<< HEAD
  hideButton(permission);
=======
>>>>>>> done update macros
=======
  hideButton(permission);
>>>>>>> hide exec button according to permission
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
<<<<<<< HEAD
<<<<<<< HEAD
  hideButton(permission);
=======
>>>>>>> done update macros
=======
  hideButton(permission);
>>>>>>> hide exec button according to permission
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

//-----------------------------------------------------------------------------
=======
>>>>>>> update for driver schedule
// DELETE controllers
//-----------------------------------------------------------------------------
//controller for Delete Driver Schedule
app.controller('Dl_Driver_Schedule', function($scope, $http) {
  hideButton(permission);
    $scope.urgentExec = function () {
      $http.put('/delete/driverSchedule', $scope.form).
        success(function(data) {
          $scope.banner = data
        });
    };
});
//controller for Delete Driver Step
app.controller('Dl_Driver_Step_RunName_GrpNbr', function($scope, $http) {
  hideButton(permission);
    $scope.urgentExec = function () {
      $http.put('/delete/Driver_Step_RunName_GrpNbr', $scope.form).
        success(function(data) {
          $scope.banner = data
        });
    };
});
//controller for Delete Driver Step
app.controller('Dl_Driver_Step_RunName', function($scope, $http) {
  hideButton(permission);
    $scope.urgentExec = function () {
      $http.put('/delete/Driver_Step_RunName', $scope.form).
        success(function(data) {
          $scope.banner = data
        });
    };
});
//controller for Delete Driver Step
app.controller('Dl_Driver_Step_RunName_Sid', function($scope, $http) {
  hideButton(permission);
    $scope.urgentExec = function () {
      $http.put('/delete/Driver_Step_RunName_Sid', $scope.form).
        success(function(data) {
          $scope.banner = data
        });
    };
});
//controller for Delete Driver Step Detail
app.controller('Dl_Driver_Step_Detail_RunName', function($scope, $http) {
  hideButton(permission);
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
  hideButton(permission);
    $scope.urgentExec = function () {
      $http.put('/add/DriverSchedule', $scope.form).
        success(function(data) {
          $scope.banner = data
        });
    };
});

//controller for Add Driver Step
app.controller('DriverStep', function($scope, $http) {
  hideButton(permission);
    $scope.urgentExec = function () {
      $http.put('/add/DriverStep', $scope.form).
        success(function(data) {
          $scope.banner = data
        });
    };
});

/*
 * Controller for view log file
 */
 app.controller('ViewLog', function($scope, $http) {
   $http.get('/Logs').
   success(function(data) {
     $scope.banner = data
   });
 });
