var LogController = require('./logController');
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();
var log = require('log4js').getLogger("index");
var db = new sqlite3.Database(__dirname + "/../server/database/LibertyMutual.db");
var pending = new sqlite3.Database(__dirname + "/../server/database/PeerReview.db");

router.get('/get/runname_driverschedule', function (req, res) {
    db.serialize(function() {
      db.all("SELECT DISTINCT run_nme FROM C_DRIVER_SCHEDULE", function(err, rows){
        if(err){
          res.send("error querrying");
        }
        else{
          res.send(rows);
        }
    });
  });
});

router.post('/get/audit_id_driverschedule', function (req, res) {
    db.serialize(function() {
      db.all("SELECT audit_id FROM C_DRIVER_SCHEDULE WHERE run_nme = '" + req.body.name + "' ", function(err, rows){
        if(err){
          res.send("error querrying");
        }
        else{
          res.send(rows);
        }
    });
  });
});

//get aid limit 500
router.get('/get/audit_id_driverschedule', function (req, res) {
    db.serialize(function() {
      db.all("SELECT DISTINCT audit_id FROM C_DRIVER_SCHEDULE LIMIT 500", function(err, rows){
        if(err){
          res.send("error querrying");
        }
        else{
          res.send(rows);
        }
    });
  });
});

router.get('/get/runname_driverstepdetail', function (req, res) {
    db.serialize(function() {
      db.all("SELECT DISTINCT run_name FROM C_DRIVER_STEP_DETAIL", function(err, rows){
        if(err){
          res.send("error querrying");
        }
        else{
          res.send(rows);
        }
    });
  });
});
router.post('/get/grpNumber_driverstepdetail', function (req, res) {
    db.serialize(function() {
      db.all("SELECT DISTINCT grp_nbr FROM C_DRIVER_STEP_DETAIL WHERE run_name = '" + req.body.runName + "' ", function(err, rows){
        if(err){
          res.send("error querrying");
        }
        else{
          res.send(rows);
        }
    });
  });
});

router.post('/get/detailID_driverstepdetail', function (req, res) {
    db.serialize(function() {
      db.all("SELECT drvr_step_dtl_id FROM C_DRIVER_STEP_DETAIL WHERE run_name = '" + req.body.runName + "' ", function(err, rows){
        if(err){
          res.send("error querrying");
        }
        else{
          res.send(rows);
        }
    });
  });
});

router.get('/get/runname_driverstep', function (req, res) {
    db.serialize(function() {
      db.all("SELECT DISTINCT run_nme FROM C_DRIVER_STEP", function(err, rows){
        if(err){
          res.send("error querrying");
        }
        else{
          res.send(rows);
        }
    });
  });
});
router.post('/get/grpNumber_driverstep', function (req, res) {
    db.serialize(function() {
      db.all("SELECT DISTINCT grp_nbr FROM C_DRIVER_STEP WHERE run_nme = '" + req.body.runName + "' ", function(err, rows){
        if(err){
          res.send("error querrying");
        }
        else{
          res.send(rows);
        }
    });
  });
});

router.get('/get/detailID_driverstep', function (req, res) {
    db.serialize(function() {
      db.all("SELECT DISTINCT drvr_step_id FROM C_DRIVER_STEP LIMIT 1000", function(err, rows){
        if(err){
          res.send("error querrying");
        }
        else{
          res.send(rows);
        }
    });
  });
});

router.post('/get/detailID_driverstep', function (req, res) {
    db.serialize(function() {
      db.all("SELECT drvr_step_id FROM C_DRIVER_STEP WHERE run_nme = '" + req.body.runName + "' ", function(err, rows){
        if(err){
          res.send("error querrying");
        }
        else{
          res.send(rows);
        }
    });
  });
});


router.put('/update/*', function(req, res,next) {
  console.log("this is the body: "+ JSON.stringify(req.body));
  vars = req.body;

  console.log(req.originalUrl); // this is it! the route finder!
  var date = new Date().toLocaleString();
  var datearr = date.split(',');

  //vars for the insert statement
  var macro  = req.originalUrl;
  devEmail = "testdata";
  managerEmail = "testdata";
  var month_year_day = datearr[0];
  var time_of_request = datearr[1];

  if(req.body.isUrgent){
    console.log("urgent!, skip!");
  }else{
    vars.isUrgent = true;
    vars = JSON.stringify(vars);
    var pendingString = "INSERT INTO pendingMacro (`macro`,`devsEmail`,`managerEmail`,`date_of_request`,`time_of_request`,`vars`) ";
    var values = "VALUES ( '" +macro+"' , '"+devEmail+"','"+managerEmail+"','"+time_of_request + "',' " +time_of_request + "','" + vars + "')";
    pending.serialize(function() {
      var ourtable = pendingString + values;
      pending.run(ourtable, function(err){
        if(err){
          console.log("Error when querrying: " + err);
          res.send("Error when querrying: " + err);
        }
      });
    });
    console.log("not that urgent");
  }
  next()
})


router.put('/update/scheduleStartTime', function(req, res) {
  db.serialize(function() {
    db.all("UPDATE C_DRIVER_SCHEDULE SET schdl_start_dtm = '" + req.body.sche_start + "' WHERE run_nme = '" + req.body.runName + "' AND audit_id = " + req.body.auditId + " ", function(err){
      if(err){
        res.send("Error when querrying");
      }
      else {
        db.all("SELECT * FROM C_DRIVER_SCHEDULE WHERE audit_id = " + req.body.auditId + " ", function(err, rows){
          if(err){
            res.send("Error response");
          }
          else{
            var data = "User, UPDATE, Schedule Start Time: " + req.body.sche_start + ", (run name: " + req.body.runName + ", audit id: " + req.body.auditId + ")";
            LogController.writeLog(data);
            res.send(rows);
          }
        });
      }
    });
  });
});

router.put('/update/statusCode', function(req, res) {
  db.serialize(function() {
    db.all("UPDATE C_DRIVER_SCHEDULE SET stts_cd = '" + req.body.statusCode + "' WHERE run_nme = '" + req.body.runName + "' AND audit_id = " + req.body.auditId + " ", function(err){
      if(err){
        res.send("Error when querrying");
      }
      else {
        db.all("SELECT * FROM C_DRIVER_SCHEDULE WHERE audit_id = " + req.body.auditId + " ", function(err, rows){
          if(err){
            res.send("Error response");
          }
          else{
            var data = "User, UPDATE, Schedule Start Time: " + req.body.sche_start + ", (run name: " + req.body.runName + ", audit id: " + req.body.auditId + ")";
            LogController.writeLog(data);
            res.send(rows);
          }
        });
      }
    });
  });
});

router.put('/update/valuationEnd', function(req, res) {
  db.serialize(function() {
    db.all("UPDATE C_DRIVER_SCHEDULE SET vlutn_end_dtm = '" + req.body.valEnd + "' WHERE run_nme = '" + req.body.runName + "' AND audit_id = " + req.body.auditId + " ", function(err){
      if(err){
        res.send("Error when querrying");
      }
      else {
        db.all("SELECT * FROM C_DRIVER_SCHEDULE WHERE audit_id = " + req.body.auditId + " ", function(err, rows){
          if(err){
            res.send("Error response");
          }
          else{
            var data = "User, UPDATE, Schedule Start Time: " + req.body.sche_start + ", (run name: " + req.body.runName + ", audit id: " + req.body.auditId + ")";
            LogController.writeLog(data);
            res.send(rows);
          }
        });
      }
    });
  });
});

router.put('/update/valuationStart', function(req, res) {
  db.serialize(function() {
    db.all("UPDATE C_DRIVER_SCHEDULE SET vlutn_start_dtm = '" + req.body.valStart + "' WHERE run_nme = '" + req.body.runName + "' AND audit_id = " + req.body.auditId + " ", function(err){
      if(err){
        res.send("Error when querrying");
      }
      else {
        db.all("SELECT * FROM C_DRIVER_SCHEDULE WHERE audit_id = " + req.body.auditId + " ", function(err, rows){
          if(err){
            res.send("Error response");
          }
          else{
            var data = "User, UPDATE, Schedule Start Time: " + req.body.sche_start + ", (run name: " + req.body.runName + ", audit id: " + req.body.auditId + ")";
            LogController.writeLog(data);
            res.send(rows);
          }
        });
      }
    });
  });
});

router.put('/update/sla_by_audit', function(req, res) {
    db.serialize(function() {
      db.all("UPDATE C_DRIVER_SCHEDULE SET sla_date = '" + req.body.sla_dt + "', sla_time = '" + req.body.sla_time + "' WHERE audit_id = " + req.body.auditId + " ", function(err){
        if(err){
          res.send("Error when querrying");
        }
        else {
          db.all("SELECT * FROM C_DRIVER_SCHEDULE WHERE audit_id = " + req.body.auditId + " ", function(err, rows){
            if(err){
              res.send("Error response");
            }
            else{
              var data = "User, UPDATE, Schedule Start Time: " + req.body.sche_start + ", (run name: " + req.body.runName + ", audit id: " + req.body.auditId + ")";
              LogController.writeLog(data);
              res.send(rows);
            }
          });
        }
      });
    });
});

router.put('/update/sla_by_runname', function(req, res) {
  db.serialize(function() {
    db.all("UPDATE C_DRIVER_SCHEDULE SET sla_date = '" + req.body.sla_dt + "', sla_time = '" + req.body.sla_time + "' WHERE run_nme = '" + req.body.runName + "' ", function(err){
      if(err){
        res.send("Error when querrying");
      }
      else {
        db.all("SELECT sla_date, sla_time, run_nme FROM C_DRIVER_SCHEDULE WHERE run_nme = '" + req.body.runName + "' LIMIT 4", function(err, rows){
          if(err){
            res.send("Error response");
          }
          else{
            var data = "User, UPDATE, Schedule Start Time: " + req.body.sche_start + ", (run name: " + req.body.runName + ", audit id: " + req.body.auditId + ")";
            LogController.writeLog(data);
            res.send(rows);
          }
        });
      }
    });
  });
});

// router.put('/update/histoy_SLA', function(req, res) {
//     console.log(req.body);
//     res.end();
// });

router.put('/update/status_name_grpNumder', function(req, res) {
  db.serialize(function() {
    db.all("UPDATE C_DRIVER_STEP_DETAIL SET run_stts_cd = '" + req.body.statusCode + "' WHERE run_name = '" + req.body.runName + "' AND grp_nbr = " + req.body.grpNumber + " ", function(err){
        if(err){
          res.send("Error when querrying");
        }
        else {
          db.all("SELECT run_stts_cd, run_name, grp_nbr FROM C_DRIVER_STEP_DETAIL WHERE run_stts_cd = '" + req.body.statusCode + "' AND run_name = '" + req.body.runName + "' AND grp_nbr = " + req.body.grpNumber + " LIMIT 4", function(err, rows){
            if(err){
              res.send("Error response");
            }
            else{
              var data = "User, UPDATE, Schedule Start Time: " + req.body.sche_start + ", (run name: " + req.body.runName + ", audit id: " + req.body.auditId + ")";
              LogController.writeLog(data);
              res.send(rows);
            }
          });
        }
    });
  });
});

router.put('/update/status_name_dtlID', function(req, res) {
  db.serialize(function() {
    console.log(req.body);
    db.all("UPDATE C_DRIVER_STEP_DETAIL SET run_stts_cd = '" + req.body.statusCode + "' WHERE run_name = '" + req.body.runName + "' AND drvr_step_dtl_id = " + req.body.detailID + " ", function(err){
      if(err){
        res.send("Error when querrying");
      }
      else {
        db.all("SELECT * FROM C_DRIVER_STEP_DETAIL WHERE drvr_step_dtl_id = " + req.body.detailID + " ", function(err, rows){
          if(err){
            res.send("Error response");
          }
          else{
            var data = "User, UPDATE, Schedule Start Time: " + req.body.sche_start + ", (run name: " + req.body.runName + ", audit id: " + req.body.auditId + ")";
            LogController.writeLog(data);
            res.send(rows);
          }
        });
      }
    });
  });
});

router.put('/update/active_step_indicator_stepID', function(req, res) {
  db.serialize(function() {
    db.all("UPDATE C_DRIVER_STEP SET actv_step_ind = '" + req.body.actv_step_ind + "' WHERE drvr_step_id = '" + req.body.drvr_step_id + "' ", function(err){
      if(err){
        res.send("Error when querrying");
      }
      else {
        db.all("SELECT * FROM C_DRIVER_STEP WHERE drvr_step_id = " + req.body.drvr_step_id + " ", function(err, rows){
          if(err){
            res.send("Error response");
          }
          else{
            var data = "User, UPDATE, Schedule Start Time: " + req.body.sche_start + ", (run name: " + req.body.runName + ", audit id: " + req.body.auditId + ")";
            LogController.writeLog(data);
            res.send(rows);
          }
        });
      }
    });
  });
});

router.put('/update/active_step_indicator_runName_stepID', function(req, res) {
  db.serialize(function() {
    db.all("UPDATE C_DRIVER_STEP SET actv_step_ind = '" + req.body.actv_step_ind + "' WHERE run_nme = '" + req.body.runName + "' AND drvr_step_id = '" + req.body.stepID + "' ", function(err){
      if(err){
        res.send("Error when querrying");
      }
      else {
        db.all("SELECT * FROM C_DRIVER_STEP WHERE drvr_step_id = " + req.body.stepID + " ", function(err, rows){
          if(err){
            res.send("Error response");
          }
          else{
            var data = "User, UPDATE, Schedule Start Time: " + req.body.sche_start + ", (run name: " + req.body.runName + ", audit id: " + req.body.auditId + ")";
            LogController.writeLog(data);
            res.send(rows);
          }
        });
      }
    });
  });
});

router.put('/update/active_step_indicator_runName', function(req, res) {
  db.serialize(function() {
    db.all("UPDATE C_DRIVER_STEP SET actv_step_ind = '" + req.body.actv_step_ind + "' WHERE run_nme = '" + req.body.runName + "' ", function(err){
      if(err){
        res.send("Error when querrying");
      }
      else {
        db.all("SELECT actv_step_ind, run_nme FROM C_DRIVER_STEP WHERE actv_step_ind = '" + req.body.actv_step_ind + "' AND run_nme = '" + req.body.runName + "' LIMIT 5", function(err, rows){
          if(err){
            res.send("Error response");
          }
          else{
            var data = "User, UPDATE, Schedule Start Time: " + req.body.sche_start + ", (run name: " + req.body.runName + ", audit id: " + req.body.auditId + ")";
            LogController.writeLog(data);
            res.send(rows);
          }
        });
      }
    });
  });
});

router.put('/update/active_step_indicator_runName_grpNumber', function(req, res) {
  db.serialize(function() {
    db.all("UPDATE C_DRIVER_STEP SET actv_step_ind = '" + req.body.actv_step_ind + "' WHERE run_nme = '" + req.body.runName + "' AND grp_nbr = " + req.body.grpNumber + " ", function(err){
      if(err){
        res.send("Error when querrying");
      }
      else {
        db.all("SELECT actv_step_ind, run_nme, grp_nbr FROM C_DRIVER_STEP WHERE actv_step_ind = '" + req.body.actv_step_ind + "' AND run_nme = '" + req.body.runName + "' AND grp_nbr = " + req.body.grpNumber + " ", function(err, rows){
          if(err){
            res.send("Error response");
          }
          else{
            var data = "User, UPDATE, Schedule Start Time: " + req.body.sche_start + ", (run name: " + req.body.runName + ", audit id: " + req.body.auditId + ")";
            LogController.writeLog(data);
            res.send(rows);
          }
        });
      }
    });
  });
});

module.exports = router;
