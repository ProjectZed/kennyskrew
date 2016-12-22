var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();
var log = require('log4js').getLogger("index");
var LogController = require('./logController');
var db = new sqlite3.Database(__dirname + "/../server/database/LibertyMutual.db");


router.post('/delete/driverSchedule', function (req, res) {
    db.serialize(function() {
      db.all("DELETE FROM C_DRIVER_SCHEDULE WHERE run_nme = '" + req.body.name + "' ", function(err, rows){
        if(err){
          res.send("error querrying");
        }
        else{
          var data = req.session.user.type + "," +
          req.session.user.username +
          ",DELETE FROM C_DRIVER_SCHEDULE WHERE run_nme = '" +
          req.body.name + ",UrgentExecute,none";
          LogController.writeLog(data);
          res.send(req.body.name);
        }
    });
  });
});

router.post('/delete/driverStep', function (req, res) {
    db.serialize(function() {
      db.all("DELETE FROM C_DRIVER_STEP WHERE run_nme = '" + req.body.name + "' ", function(err, rows){
        if(err){
          res.send("error querrying");
        }
        else{
          var data = req.session.user.type + "," +
          req.session.user.username +
          ",DELETE FROM C_DRIVER_STEP WHERE run_nme = '" +
          req.body.name + "' " + ",UrgentExecute,none";
          LogController.writeLog(data);
          var deleted = "run name: " + req.body.name + " ";
          res.send(deleted);
        }
    });
  });
});

router.post('/delete/driverStep_runName_grpNbr', function (req, res) {
    db.serialize(function() {
      db.all("DELETE FROM C_DRIVER_STEP WHERE run_nme = '" + req.body.runName + "' AND grp_nbr = " + req.body.grpNumber + " ", function(err, rows){
        if(err){
          res.send("error querrying");
        }
        else{
          var data = req.session.user.type + "," +
          req.session.user.username +
          ",DELETE FROM C_DRIVER_STEP WHERE run_nme = '" +
          req.body.runName + "' AND grp_nbr = " +
          req.body.grpNumber + ",UrgentExecute,none";
          LogController.writeLog(data);
          var deleted = " run name: " + req.body.runName + ", groupNumber: " + req.body.grpNumber + " ";
          res.send(deleted);
        }
    });
  });
});

router.post('/delete/Driver_Step_RunName_Sid', function (req, res) {
    db.serialize(function() {
      db.all("DELETE FROM C_DRIVER_STEP WHERE run_nme = '" + req.body.runName + "' AND drvr_step_id = '" + req.body.stepID + "' ", function(err, rows){
        if(err){
          res.send("error querrying");
        }
        else{
          var data = req.session.user.type + "," +
          req.session.user.username +
          ",DELETE FROM C_DRIVER_STEP WHERE run_nme = '" +
          req.body.runName + "' AND drvr_step_id = '" +
          req.body.stepID + ",UrgentExecute,none";
          LogController.writeLog(data);
          var deleted = " run name: " + req.body.runName + ", driver step id: " + req.body.stepID + " ";
          res.send(deleted);
        }
    });
  });
});

router.post('/delete/Driver_Step_Detail_RunName', function (req, res) {
    db.serialize(function() {
      db.all("DELETE FROM C_DRIVER_STEP_DETAIL WHERE run_name = '" + req.body.name + "' ", function(err, rows){
        if(err){
          res.send("error querrying");
        }
        else{
          var data = req.session.user.type + "," +
          req.session.user.username +
          ",DELETE FROM C_DRIVER_STEP_DETAIL WHERE run_name = '" +
          req.body.name + ",UrgentExecute,none";
          LogController.writeLog(data);
          var deleted = "run name: " + req.body.name + " ";
          res.send(deleted);
        }
    });
  });
});
module.exports = router;
