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

    $scope.exec = function(){
      var comment = prompt("Please enter your comment", "");
      if(comment != null){
      var input = {
        initiator : username,
        time : new Date().toString(),
        type : "UPDATE SCHED START",
        permission : permission,
        macro: "UPDATE C_DRIVER_SCHEDULE SET schdl_start_dtm = ? WHERE run_nme = ? AND audit_id = ?",
        params: JSON.stringify([$scope.sche_start, runname.name, aid.audit]),
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
      var r = confirm("Are you sure want to update?");
      if (r == true) {
        var input = {
          runName : runname.name,
          auditId : aid.audit,
          sche_start : $scope.sche_start
        }
        $http.put('/update/scheduleStartTime', input).success(function(data) {
          $scope.banner = JSON.stringify(data, null, 2);
          showBanner();
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

  $scope.exec = function(){
    var comment = prompt("Please enter your comment", "");
    if(comment != null){
    var input = {
      initiator : username,
      time : new Date().toString(),
      type : "UPDATE STTS",
      permission : permission,
      macro: "UPDATE C_DRIVER_SCHEDULE SET stts_cd = ? WHERE run_nme = ? AND audit_id = ?",
      params: JSON.stringify([$scope.Status, runname.name, aid.audit]),
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
    var r = confirm("Are you sure want to update?");
    if (r == true) {
      var input = {
        runName : runname.name,
        auditId : aid.audit,
        statusCode : $scope.Status
      }
      $http.put('/update/statusCode', input).
        success(function(data) {
          $scope.banner = JSON.stringify(data, null, 2);
          showBanner();
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

  $scope.exec = function(){
    var comment = prompt("Please enter your comment", "");
    if(comment != null){
    var input = {
      initiator : username,
      time : new Date().toString(),
      type : "UPDATE VAL END",
      permission : permission,
      macro: "UPDATE C_DRIVER_SCHEDULE SET vlutn_end_dtm = ? WHERE run_nme = ? AND audit_id = ?",
      params: JSON.stringify([$scope.valEnd, runname.name, aid.audit]),
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
        showBanner();
      });
    }
  };
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

  $scope.exec = function(){
    var comment = prompt("Please enter your comment", "");
    if(comment != null){
    var input = {
      initiator : username,
      time : new Date().toString(),
      type : "UPDATE VAL START",
      permission : permission,
      macro: "UPDATE C_DRIVER_SCHEDULE SET vlutn_start_dtm = ? WHERE run_nme = ? AND audit_id = ?",
      params: JSON.stringify([$scope.valStart, runname.name, aid.audit]),
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
        showBanner();
      });
    }
  };
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

  $scope.exec = function(){
    var comment = prompt("Please enter your comment", "");
    if(comment != null){
    var input = {
      initiator : username,
      time : new Date().toString(),
      type : "UPDATE SLA",
      permission : permission,
      macro: "UPDATE C_DRIVER_SCHEDULE SET sla_date = ?, sla_time = ? WHERE audit_id = ?",
      params: JSON.stringify([$scope.sla_dt, $scope.sla_time, aid.audit]),
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
      var r = confirm("Are you sure want to update?");
      if (r == true) {
        var input = {
          auditId : aid.audit,
          sla_dt : $scope.sla_dt,
          sla_time : $scope.sla_time
        }
        $http.put('/update/sla_by_audit', input).success(function(data) {
          $scope.banner = JSON.stringify(data, null, 2);
          showBanner();
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

  $scope.exec = function(){
    var comment = prompt("Please enter your comment", "");
    if(comment != null){
    var input = {
      initiator : username,
      time : new Date().toString(),
      type : "UPDATE SLA",
      permission : permission,
      macro: "UPDATE C_DRIVER_SCHEDULE SET sla_date = ?, sla_time = ? WHERE run_nme = ?",
      params: JSON.stringify([$scope.sla_dt, $scope.sla_time, runname.name]),
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
    var r = confirm("Are you sure want to update?");
    if (r == true) {
      var input = {
        runName : runname.name,
        sla_dt : $scope.sla_dt,
        sla_time : $scope.sla_time
      }
      $http.put('/update/sla_by_runname', input).
        success(function(data) {
          $scope.banner = JSON.stringify(data, null, 2) + "\n ...";
          showBanner();
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

  $scope.exec = function(){
    var comment = prompt("Please enter your comment", "");
    if(comment != null){
    var input = {
      initiator : username,
      time : new Date().toString(),
      type : "UPDATE RUN STATUS CODE",
      permission : permission,
      macro: "UPDATE C_DRIVER_STEP_DETAIL SET run_stts_cd = ? WHERE run_name = ? AND grp_nbr = ?",
      params: JSON.stringify([$scope.statusCode, runname.runName, groupNumber.grpNumber]),
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
    var r = confirm("Are you sure want to update?");
    if (r == true) {
      var input = {
        runName : runname.runName,
        grpNumber : groupNumber.grpNumber,
        statusCode : $scope.statusCode
      }
    $http.put('/update/status_name_grpNumder', input).
      success(function(data) {
        $scope.banner = JSON.stringify(data, null, 2) + "\n ...";
        showBanner();
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

  $scope.exec = function(){
    var comment = prompt("Please enter your comment", "");
    if(comment != null){
    var input = {
      initiator : username,
      time : new Date().toString(),
      type : "UPDATE RUN STATUS CODE",
      permission : permission,
      macro: "UPDATE C_DRIVER_STEP_DETAIL SET run_stts_cd = ? WHERE run_name = ? AND drvr_step_dtl_id = ?",
      params: JSON.stringify([$scope.statusCode, runname.runName, detailID.detailID]),
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
    var r = confirm("Are you sure want to update?");
    if (r == true) {
      var input = {
        runName : runname.runName,
        detailID : detailID.detailID,
        statusCode : $scope.statusCode
      }
      $http.put('/update/status_name_dtlID', input).
        success(function(data) {
          $scope.banner = JSON.stringify(data, null, 2);
          showBanner();
        });
        return true;
      } else {
        return false;
      }
  };
});


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

  $scope.exec = function(){
    var comment = prompt("Please enter your comment", "");
    if(comment != null){
    var input = {
      initiator : username,
      time : new Date().toString(),
      type : "UPDATE ASI by DSI",
      permission : permission,
      macro: "UPDATE C_DRIVER_STEP SET actv_step_ind = ? WHERE drvr_step_id = ? ",
      params: JSON.stringify([$scope.actv_step_ind, sid.stepID]),
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
    var r = confirm("Are you sure want to update?");
    if (r == true) {
      var input = {
        drvr_step_id : sid.stepID,
        actv_step_ind : $scope.actv_step_ind
      }
    $http.put('/update/active_step_indicator_stepID', input).success(function(data) {
        $scope.banner = JSON.stringify(data, null, 2);
        showBanner();
      });
    }
  };
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

  $scope.exec = function(){
    var comment = prompt("Please enter your comment", "");
    if(comment != null){
    var input = {
      initiator : username,
      time : new Date().toString(),
      type : "UPDATE ASI by RN DSI",
      permission : permission,
      macro: "UPDATE C_DRIVER_STEP SET actv_step_ind = ? WHERE run_nme = ? AND drvr_step_id = ?",
      params: JSON.stringify([$scope.actv_step_ind, runname.runName, sid.stepID]),
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
    var r = confirm("Are you sure want to update?");
    if (r == true) {
      var input = {
        runName : runname.runName,
        stepID : sid.stepID,
        actv_step_ind : $scope.actv_step_ind
      }
    $http.put('/update/active_step_indicator_runName_stepID', input).
      success(function(data) {
        $scope.banner = JSON.stringify(data, null, 2);
        showBanner();
      });
    }
  };
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

  $scope.exec = function(){
    var comment = prompt("Please enter your comment", "");
    if(comment != null){
    var input = {
      initiator : username,
      time : new Date().toString(),
      type : "UPDATE ASI by RN",
      permission : permission,
      macro: "UPDATE C_DRIVER_STEP SET actv_step_ind = ? WHERE run_nme = ?",
      params: JSON.stringify([$scope.actv_step_ind, runname.runName]),
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

  /* end */
  $scope.urgentExec = function () {
    var r = confirm("Are you sure want to update?");
    if (r == true) {
      var input = {
        runName : runname.runName,
        actv_step_ind : $scope.actv_step_ind
      }
      $http.put('/update/active_step_indicator_runName', input).
        success(function(data) {
          $scope.banner = JSON.stringify(data, null, 2) + "\n ...";
          showBanner();
      });
    }
  };
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

  $scope.exec = function(){
    var comment = prompt("Please enter your comment", "");
    if(comment != null){
    var input = {
      initiator : username,
      time : new Date().toString(),
      type : "UPDATE ASI by RN GN",
      permission : permission,
      macro: "UPDATE C_DRIVER_STEP SET actv_step_ind = ? WHERE run_nme = ? AND grp_nbr = ?",
      params: JSON.stringify([$scope.actv_step_ind, runname.runName, groupNumber.grpNumber]),
      comment
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
    var r = confirm("Are you sure want to update?");
    if (r == true) {
      var input = {
        runName : runname.runName,
        grpNumber : groupNumber.grpNumber,
        actv_step_ind : $scope.actv_step_ind
      }
      $http.put('/update/active_step_indicator_runName_grpNumber', input).
        success(function(data) {
          $scope.banner = JSON.stringify(data, null, 2);
          showBanner();
      });
    }
  };
});
