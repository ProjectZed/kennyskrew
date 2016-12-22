var LogController = require('./logController');
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();
var log = require('log4js').getLogger("index");
var db = new sqlite3.Database(__dirname + "/../server/database/LibertyMutual.db");
var pending = new sqlite3.Database(__dirname + "/../server/database/Pending.db");
var users = new sqlite3.Database(__dirname + "/../server/database/Users.db");
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport('smtps://digitaldashlm%40gmail.com:cs320useonly@smtp.gmail.com');

/*var mailOptions = {
    from: '"Elvis ?" <chongzechen07@gmail.com>', // sender address
    to: 'chongzechen07@gmail.com', // list of receivers
    subject: 'Requesting PeerReview', // Subject line
    text: 'Please login and PR', // plaintext body
    html: '<b>PPPPPPPPPPPRRRRRRRRRRRRR ?</b>' // html body
};*/

router.post('/delete/pending', function(req, res) {
  pending.serialize(function() {
    pending.all("DELETE FROM pending_task WHERE id = " + req.body.id, function(err){
      if(err){
        res.send("Error when querrying");
      }
      else {
        users.serialize(function() {
          users.all("SELECT email from user_info where username = '" + req.body.receiver + "'", function(err, row){
            if(err){
              res.send("Error when querrying");
            }
            else {
              var emails = "";
              for(var i = 0; i<row.length; i++){
                emails += row[i].email;
                if(i != row.length - 1){
                  emails += ", "
                }
              }
              var mailOptions = {
                  from: '"Elvis" <digitaldashlm@gmail.com>', // sender address
                  to: emails, // list of receivers
                  subject: 'Responding to your PeerReview', // Subject line
                  text: req.body.comment, // plaintext body
                  html: '<h3>Peer Review: </h3>' +
                          '<h5>Receiver: ' + req.body.receiver + '</h5>' +
                           '<h5>Comment: ' + req.body.comment + '</h5>' // html body
              };
              transporter.sendMail(mailOptions, function(error, info){
                if(error){
                  return console.log(error);
                }
                console.log('Message sent: ' + info.response);
              });

            }
          });
        });
        res.send("delete pending successfully");
      }
    });
  });
});

router.put('/response/:id', function(req, res) {
  pending.serialize(function() {
    pending.all("UPDATE pending_response SET read = 1 WHERE id = " + req.params.id, function(err){
      if(err){
        res.send("Error when querrying");
      }
      else {
        res.send("Marked read true successfully");
      }
    });
  });
});

router.get('/response/id/:id', function(req, res){
  pending.serialize(function() {
    pending.all("SELECT * FROM pending_response where id = " + req.params.id, function(err, rows){
      if(err){
        res.send("error querrying");
      }
      else{
        res.send(rows);
      }
    });
  });
});

router.get('/response/username/:username', function(req, res){
  pending.serialize(function() {
    pending.all("SELECT * FROM pending_response where receiver = '" + req.params.username + "'", function(err, rows){
      if(err){
        res.send("error querrying");
      }
      else{
        res.send(rows);
      }
    });
  });
});

router.post('/response', function(req, res){
  pending.serialize(function() {
    pending.all("INSERT INTO pending_response (receiver, time, type, " +
    "permission, macro, params, comment, read) VALUES (?,?,?,?,?,?,?,?)",
      [req.body.receiver, req.body.time, req.body.type,
        req.body.permission, req.body.macro, req.body.params, req.body.comment, req.body.read],
      function(err, rows){
        if(err){
          res.send("error querrying");
        }
        else{
          res.send(rows);
        }
    });
  });
});

router.post('/run', function(req, res){
  db.serialize(function() {
    db.all(req.body.macro, req.body.params ,function(err, rows){
      if(err){
        res.send("error querrying");
      }
      else{
        pending.serialize(function() {
          pending.all("DELETE FROM pending_task WHERE id = " + req.body.id ,function(err, rows){
            if(err){
              res.send("error delete macro from pending");
            }
            else{
              var macro = req.body.macro;
              for(var i = 0; i< req.body.params.length; i++){
                macro = macro.replace('?', req.body.params[i]);
              }
              var data = req.body.permission + "," +req.body.initiator + "," + macro + ",PR and Approve by " + req.session.user.username + "," + req.body.comment;
              LogController.writeLog(data);
              res.send("Run successfully!");
            }
          });
        });
      }
    });
  });
});

router.get('/pending', function(req, res){
  pending.serialize(function() {
    pending.all("SELECT * FROM pending_task", function(err, rows){
      if(err){
        res.send("error querrying");
      }
      else{
        res.send(rows);
      }
    });
  });
});

router.get(['/pending/:id', '/PeerReview/:id'], function(req, res){
  pending.serialize(function() {
    pending.all("SELECT * FROM pending_task where id = " + req.params.id, function(err, rows){
      if(err){
        res.send("error querrying");
      }
      else{
        res.send(rows);
      }
    });
  });
});

router.post('/pending', function(req, res){
  pending.serialize(function() {
    pending.all("INSERT INTO pending_task (initiator, time, type, " +
    "permission, macro, params, comment) VALUES (?,?,?,?,?,?,?)",
      [req.body.initiator, req.body.time, req.body.type,
        req.body.permission, req.body.macro, req.body.params, req.body.comment],
      function(err, rows){
        if(err){
          res.send("error querrying");
        }
        else{
          users.serialize(function() {
            users.all("SELECT email from user_info where type = 'administrator'", function(err, row){
              if(err){
                res.send("Error when querrying");
              }
              else {
                var emails = "";
                for(var i = 0; i<row.length; i++){
                  emails += row[i].email;
                  if(i != row.length - 1){
                    emails += ", "
                  }
                }
                var mailOptions = {
                    from: '"Elvis" <digitaldashlm@gmail.com>', // sender address
                    to: emails, // list of receivers
                    subject: 'Requesting PeerReview', // Subject line
                    text: req.body.comment, // plaintext body
                    html: '<h3>Pending Peer Review: </h3>' +
                            '<h5>Initiator: ' + req.body.initiator + '</h5>' +
                  	         '<h5>Request type: ' + req.body.type + '</h5>' +
                             '<h5>Permission: ' + req.body.permission + '</h5>' +
                  	         '<h5>Request time: ' + req.body.time + '</h5>' +
                  	         '<h5>Macro: ' + req.body.macro + '</h5>' +
                  	         '<h5>Params: ' + req.body.params + '</h5>' +
                  	         '<h5>Comment: ' + req.body.comment + '</h5>' // html body
                };
                transporter.sendMail(mailOptions, function(error, info){
                  if(error){
                    return console.log(error);
                  }
                  console.log('Message sent: ' + info.response);
                });

              }
            });
          });
          res.send(rows);
        }
    });
  });
});

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
        }else{
          res.send(rows);
        }
    });
  });
});

router.get('/get/driverSchedule', function (req, res) {
    db.serialize(function() {
      db.all("SELECT DISTINCT run_nme FROM C_DRIVER_SCHEDULE", function(err, rows){
        if(err){
          res.send("error querrying");
        }else{
          res.send(rows);
        }
    });
  });
});

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

router.post('/get/detailID_driverstep', function (req, res) {
    db.serialize(function() {
      db.all("SELECT drvr_step_id FROM C_DRIVER_STEP WHERE run_nme = '" + req.body.runName + "' ", function(err, rows){
        if(err){
          res.send("error querrying");
        }else{
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

router.post('/get/detailID_driverstep', function (req, res) {
    db.serialize(function() {
      db.all("SELECT drvr_step_id FROM C_DRIVER_STEP WHERE run_nme = '" + req.body.runName + "' ", function(err, rows){
        if(err){
          res.send("error querrying");
        }else{
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
            var data = req.session.user.type + "," +
            req.session.user.username +
            ",Update Schedule Start time = " +
            req.body.sche_start + " WHERE run_nme = " +
            req.body.runName + " and Audit ID = " +
            req.body.auditId + ",UrgentExecute,none";
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
            var data = req.session.user.type + "," +
            req.session.user.username +
            ",UPDATE C_DRIVER_SCHEDULE SET stts_cd = " +
            req.body.statusCode + " WHERE run_nme = " +
            req.body.runName + " and Audit ID = " +
            req.body.auditId + ",UrgentExecute,none";
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
            var data = req.session.user.type + "," +
            req.session.user.username +
            ",UPDATE C_DRIVER_SCHEDULE SET vlutn_end_dtm = '" +
            req.body.valEnd + "' WHERE run_nme = '" +
            req.body.runName + "' AND audit_id = " +
            req.body.auditId + ",UrgentExecute,none";
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
            var data = req.session.user.type + "," +
            req.session.user.username +
            ",UPDATE C_DRIVER_SCHEDULE SET vlutn_start_dtm = '" +
            req.body.valStart + "' WHERE run_nme = '" +
            req.body.runName + "' AND audit_id = " +
            req.body.auditId + ",UrgentExecute,none";
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
              var data = req.session.user.type + "," +
              req.session.user.username +
              ",UPDATE C_DRIVER_SCHEDULE SET sla_date = '" +
              req.body.sla_dt + "' and sla_time = '" +
              req.body.sla_time + "' WHERE audit_id = " +
              req.body.auditId + ",UrgentExecute,none";
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
            var data = req.session.user.type + "," +
            req.session.user.username +
            ",UPDATE C_DRIVER_SCHEDULE SET sla_date = '" +
            req.body.sla_dt + "' and sla_time = '" +
            req.body.sla_time + "' WHERE run_nme = '" +
            req.body.runName + ",UrgentExecute,none";
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
              var data = req.session.user.type + "," +
              req.session.user.username +
              ",UPDATE C_DRIVER_STEP_DETAIL SET run_stts_cd = '" +
              req.body.statusCode + "' WHERE run_name = '" +
              req.body.runName + "' AND grp_nbr = " +
              req.body.grpNumber + ",UrgentExecute,none";
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
            var data = req.session.user.type + "," +
            req.session.user.username +
            ",UPDATE C_DRIVER_STEP_DETAIL SET run_stts_cd = '" +
            req.body.statusCode + "' WHERE run_name = '" +
            req.body.runName + "' AND drvr_step_dtl_id = " +
            req.body.detailID + ",UrgentExecute,none";
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
            var data = req.session.user.type + "," +
            req.session.user.username +
            ",UPDATE C_DRIVER_STEP SET actv_step_ind = '" +
            req.body.actv_step_ind + "' WHERE drvr_step_id = '" +
            req.body.drvr_step_id + ",UrgentExecute,none";
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
            var data = req.session.user.type + "," +
            req.session.user.username +
            ",UPDATE C_DRIVER_STEP SET actv_step_ind = '" +
            req.body.actv_step_ind + "' WHERE run_nme = '" +
            req.body.runName + "' AND drvr_step_id = '" +
            req.body.stepID + ",UrgentExecute,none";
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
            var data = req.session.user.type + "," +
            req.session.user.username +
            ",UPDATE C_DRIVER_STEP SET actv_step_ind = '" +
            req.body.actv_step_ind + "' WHERE run_nme = '" +
            req.body.runName + ",UrgentExecute,none";
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
            var data = req.session.user.type + "," +
            req.session.user.username +
            ",UPDATE C_DRIVER_STEP SET actv_step_ind = '" +
            req.body.actv_step_ind + "' WHERE run_nme = '" +
            req.body.runName + "' AND grp_nbr = " +
            req.body.grpNumber + ",UrgentExecute,none";
            LogController.writeLog(data);
            res.send(rows);
          }
        });
      }
    });
  });
});

module.exports = router;
