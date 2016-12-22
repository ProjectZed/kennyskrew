//-----------------------------------------------------------------------------
// DELETE controllers
//-----------------------------------------------------------------------------
//controller for Delete Driver Schedule
app.controller('Dl_Driver_Schedule', function($scope, $http) {
    hideButton(permission);
    hideBanner();

    /* drop down */
    var runname;
    $http.get('/get/runname_driverschedule').success(function(data) {
      $scope.items = data;
      $scope.runName= $scope.items[0];
      runname = { name : data[0].run_nme }
    });

    $scope.selectedValue = function(x) {
      runname = { name : x.run_nme }
    }
    /* end */

    $scope.exec = function(){
      var comment = prompt("Please enter your comment", "");
      if(comment != null){
      var input = {
        initiator : username,
        time : new Date().toString(),
        type : "DELETE SCHED by RN",
        permission : permission,
        macro: "DELETE FROM C_DRIVER_SCHEDULE WHERE run_nme = ?",
        params: JSON.stringify([runname.name]),
        comment: comment
      }
      $http.post('/pending', input).success(function(data1) {
        if(permission == "administrator"){
        $http.get('/pending').success(function(data) {
          var prs = [];
          for(var i = 0; i< data.length; i++){
            prs.push({
              id: data[i].id,
              initiator: (i+1) + ". " + data[i].initiator + " : " + data[i].type
            });
          }
          $scope.$root.prs = prs;
          if(data.length == 0){
            document.getElementById("badge").style.display = "none";
          }else{
            document.getElementById("badge").style.display = "inline-block";
            document.getElementById("badge").innerHTML = data.length;
          }
        });
      }
          $scope.banner = "Macro is waiting to get PR...";
          showBanner();
      });
    }
    }

    $scope.urgentExec = function () {
      var r = confirm("Are you sure want to delete?");
      if (r == true) {
        $http.post('/delete/driverSchedule', runname).success(function(data) {
          $scope.banner = "Deleted " + data + " Successfully !";
          //refresh items after Delete
          $http.get('/get/runname_driverschedule').success(function(data) {
            $scope.items = data;
            $scope.runName= $scope.items[0];
            runname = { name : data[0].run_nme }
          });
          showBanner();
          //end
        });
        return true;
      } else {
        return false;
      }
    };
});

//controller for Delete Driver Step
app.controller('Dl_Driver_Step_RunName_GrpNbr', function($scope, $http) {
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
      groupNumber = { grpNumber : data[0].grp_nbr }
    });
  }

  $scope.selectedValue2 = function(y) {
    groupNumber = { grpNumber : y.grp_nbr }
  }
  /* end */

  $scope.exec = function(){
    var comment = prompt("Please enter your comment", "");
    if(comment != null){
    var input = {
      initiator : username,
      time : new Date().toString(),
      type : "DELETE SCHED by RN GNR",
      permission : permission,
      macro: "DELETE FROM C_DRIVER_STEP WHERE run_nme = ? AND grp_nbr = ?",
      params: JSON.stringify([runname.runName, groupNumber.grpNumber]),
      comment: comment
    }
    $http.post('/pending', input).success(function(data1) {
      if(permission == "administrator"){
      $http.get('/pending').success(function(data) {
        var prs = [];
        for(var i = 0; i< data.length; i++){
          prs.push({
            id: data[i].id,
            initiator: (i+1) + ". " + data[i].initiator + " : " + data[i].type
          });
        }
        $scope.$root.prs = prs;
        if(data.length == 0){
          document.getElementById("badge").style.display = "none";
        }else{
          document.getElementById("badge").style.display = "inline-block";
          document.getElementById("badge").innerHTML = data.length;
        }
      });
    }
        $scope.banner = "Macro is waiting to get PR...";
        showBanner();
    });
  }
  }

    $scope.urgentExec = function () {
      var r = confirm("Are you sure want to delete?");
      if (r == true) {
        var input = {
          runName : runname.runName,
          grpNumber : groupNumber.grpNumber,
        }
      $http.post('/delete/driverStep_runName_grpNbr', input).
        success(function(data) {
          $scope.banner = "Deleted " + data + " Successfully !";
          //refresh item list
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
          showBanner();
          //end
        });
        return true;
      } else {
        return false;
      }
    };
});

//controller for Delete Driver Step
app.controller('Dl_Driver_Step_RunName', function($scope, $http) {
  hideButton(permission);
  hideBanner();

    /* drop down */
  var runname;
  $http.get('/get/runname_driverstep').success(function(data) {
    $scope.items = data;
    $scope.runName= $scope.items[0];
    runname = { name : data[0].run_nme }
  });
  $scope.selectedValue = function(x) {
    runname = { name : x.run_nme }
  }
  /* end */

  $scope.exec = function(){
    var comment = prompt("Please enter your comment", "");
    if(comment != null){
    var input = {
      initiator : username,
      time : new Date().toString(),
      type : "DELETE STEP by RN",
      permission : permission,
      macro: "DELETE FROM C_DRIVER_STEP WHERE run_nme = ?",
      params: JSON.stringify([runname.name]),
      comment: comment
    }
    $http.post('/pending', input).success(function(data1) {
      if(permission == "administrator"){
      $http.get('/pending').success(function(data) {
        var prs = [];
        for(var i = 0; i< data.length; i++){
          prs.push({
            id: data[i].id,
            initiator: (i+1) + ". " + data[i].initiator + " : " + data[i].type
          });
        }
        $scope.$root.prs = prs;
        if(data.length == 0){
          document.getElementById("badge").style.display = "none";
        }else{
          document.getElementById("badge").style.display = "inline-block";
          document.getElementById("badge").innerHTML = data.length;
        }
      });
    }
        $scope.banner = "Macro is waiting to get PR...";
        showBanner();
    });
  }
  }

    $scope.urgentExec = function () {
      var r = confirm("Are you sure want to delete?");
      if (r == true) {
      $http.post('/delete/driverStep', runname).success(function(data) {
          $scope.banner = "Deleted " + data + " Successfully !";
          //refresh items after Delete
          $http.get('/get/runname_driverstep').success(function(data) {
            $scope.items = data;
            $scope.runName= $scope.items[0];
            runname = { name : data[0].run_nme }
          });
          showBanner();
        });
        return true;
      } else {
        return false;
      }
    };
});

//controller for Delete Driver Step
app.controller('Dl_Driver_Step_RunName_Sid', function($scope, $http) {
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

  $scope.exec = function(){
    var comment = prompt("Please enter your comment", "");
    if(comment != null){
    var input = {
      initiator : username,
      time : new Date().toString(),
      type : "DELETE STEP by RN SID",
      permission : permission,
      macro: "DELETE FROM C_DRIVER_STEP WHERE run_nme = ? AND drvr_step_id = ?",
      params: JSON.stringify([runname.runName, sid.stepID]),
      comment: comment
    }
    $http.post('/pending', input).success(function(data1) {
      if(permission == "administrator"){
      $http.get('/pending').success(function(data) {
        var prs = [];
        for(var i = 0; i< data.length; i++){
          prs.push({
            id: data[i].id,
            initiator: (i+1) + ". " + data[i].initiator + " : " + data[i].type
          });
        }
        $scope.$root.prs = prs;
        if(data.length == 0){
          document.getElementById("badge").style.display = "none";
        }else{
          document.getElementById("badge").style.display = "inline-block";
          document.getElementById("badge").innerHTML = data.length;
        }
      });
    }
        $scope.banner = "Macro is waiting to get PR...";
        showBanner();
    });
  }
  }

    $scope.urgentExec = function () {
      var r = confirm("Are you sure want to delete?");
      if (r == true) {
        var input = {
          runName : runname.runName,
          stepID : sid.stepID,
        }
        $http.post('/delete/Driver_Step_RunName_Sid', input).
        success(function(data) {
            $scope.banner = "Deleted " + data + " Successfully !";
            //refresh item list
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
            showBanner()
            //end
        });
        return true;
      } else {
        return false;
      }
    };
});

//controller for Delete Driver Step Detail
app.controller('Dl_Driver_Step_Detail_RunName', function($scope, $http) {
  hideButton(permission);
  hideBanner();

  /* drop down */
  var runname;
  $http.get('/get/runname_driverstepdetail').success(function(data) {
    $scope.items = data;
    $scope.runName= $scope.items[0];
    runname = { name : data[0].run_name }
  });

  $scope.selectedValue = function(x) {
    runname = { name : x.run_name }
  }
  /* end */

  $scope.exec = function(){
    var comment = prompt("Please enter your comment", "");
    if(comment != null){
    var input = {
      initiator : username,
      time : new Date().toString(),
      type : "DELETE STEP DETAIL by RN",
      permission : permission,
      macro: "DELETE FROM C_DRIVER_STEP_DETAIL WHERE run_name = ?",
      params: JSON.stringify([runname.name]),
      comment: comment
    }
    $http.post('/pending', input).success(function(data1) {
      if(permission == "administrator"){
      $http.get('/pending').success(function(data) {
        var prs = [];
        for(var i = 0; i< data.length; i++){
          prs.push({
            id: data[i].id,
            initiator: (i+1) + ". " + data[i].initiator + " : " + data[i].type
          });
        }
        $scope.$root.prs = prs;
        if(data.length == 0){
          document.getElementById("badge").style.display = "none";
        }else{
          document.getElementById("badge").style.display = "inline-block";
          document.getElementById("badge").innerHTML = data.length;
        }
      });
    }
        $scope.banner = "Macro is waiting to get PR...";
        showBanner();
    });
  }
  }

    $scope.urgentExec = function () {
      var r = confirm("Are you sure want to delete?");
      if (r == true) {
        $http.post('/delete/Driver_Step_Detail_RunName', runname).success(function(data) {
          $scope.banner = "Deleted " + data + " Successfully !";
          $http.get('/get/runname_driverstepdetail').
          success(function(data) {
            $scope.items = data;
            $scope.runName= $scope.items[0];
            runname = { name : data[0].run_name }
          });
          showBanner();
        });
        return true;
      } else {
        return false;
      }
    };
});
