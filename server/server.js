var express  = require('express');
var app = express();
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();

//database location
var db = new sqlite3.Database("/Users/thanhpham/Downloads/LibertyMutual.db");
//user table
var users = new sqlite3.Database("/Users/thanhpham/Downloads/Users.db");
users.serialize(function() {
    users.run("CREATE TABLE IF NOT EXISTS user_info (id INT PRIMARY KEY, username TEXT, password TEXT, email TEXT, type TEXT)");
    users.run("INSERT OR REPLACE INTO user_info VALUES (?,?,?,?,?)", [1, 'developer', 'abcd', '@gmail.com', 'developer']);
    users.run("INSERT OR REPLACE INTO user_info VALUES (?,?,?,?,?)", [2, 'admin', 'abcd', '@gmail.com', 'administrator']);
});

// //MAILGUN service
// var api_key = 'key-a63b9592560ea2c4f5dabe2dc8c53682';
// var domain = 'sandbox5535bd649fbc436193cba0471dc6d85d.mailgun.org';
// var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});




//Config middleware
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../gui'));




//-----------------------------------------------------------------------------
// MACROS Routes
//-----------------------------------------------------------------------------

//Login Logout
app.post('/login', function(req, res) {
  users.serialize(function() {
    users.all("SELECT * FROM user_info WHERE username = '" + req.body.username + "' AND password = '" + req.body.password + "' ", function(err, rows){
        if(err){
          console.log("Fail authenticate");
        }
        else {
          console.log(rows);
        }
    });
  });
});


app.put('/update/scheduleStartTime', function(req, res) {
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
            res.send(rows);
          }
        });
      }
    });
  });
});

app.put('/update/statusCode', function(req, res) {
  db.serialize(function() {
    db.all("UPDATE C_DRIVER_SCHEDULE SET stts_cd = '" + req.body.Status + "' WHERE run_nme = '" + req.body.runName + "' AND audit_id = " + req.body.auditId + " ", function(err){
      if(err){
        res.send("Error when querrying");
      }
      else {
        db.all("SELECT * FROM C_DRIVER_SCHEDULE WHERE audit_id = " + req.body.auditId + " ", function(err, rows){
          if(err){
            res.send("Error response");
          }
          else{
            res.send(rows);
          }
        });
      }
    });
  });
});

app.put('/update/valuationEnd', function(req, res) {
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
            res.send(rows);
          }
        });
      }
    });
  });
});

app.put('/update/valuationStart', function(req, res) {
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
            res.send(rows);
          }
        });
      }
    });
  });
});

//DEMO
app.put('/update/sla_by_audit', function(req, res) {
<<<<<<< HEAD
  // if (true) {
  //   var data = {
  //     from: 'Digital Dash <postmaster@sandbox5535bd649fbc436193cba0471dc6d85d.mailgun.org>',
  //     to: 'serobnic@mail.ru',
  //     subject: 'Hello',
  //     text: req.body
  //   };
  //   mailgun.messages().send(data, function (error, body) {
  //     if(error){
  //       res.send("Mail not sent. Error occured");
  //     }
  //     else{
  //       res.send("Your request for Update SLA Date and Time has been sent to administrator");
  //     }
  //   });
  // }
  // else {
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
              res.send(rows);
            }
          });
        }
      });
=======
  db.serialize(function() {
    db.all("UPDATE C_DRIVER_SCHEDULE SET sla_date = '" + req.body.sla_dt + "' AND sla_time = '" + req.body.sla_time + "' WHERE audit_id = " + req.body.auditId + " ", function(err){
      if(err){
        res.send("Error when querrying");
      }
      else {
        db.all("SELECT * FROM C_DRIVER_SCHEDULE WHERE audit_id = " + req.body.auditId + " ", function(err, rows){
          if(err){
            res.send("Error response");
          }
          else{
            res.send(rows);
          }
        });
      }
>>>>>>> 6d75c1ae96030dc97a6bac994c6df1ae988af7dc
    });
});

app.put('/update/sla_by_runname', function(req, res) {
  db.serialize(function() {
    db.all("UPDATE C_DRIVER_SCHEDULE SET sla_date = '" + req.body.sla_dt + "' AND sla_time = '" + req.body.sla_time + "' WHERE run_nme = '" + req.body.runName + "' ", function(err){
      if(err){
        res.send("Error when querrying");
      }
      else {
        db.all("SELECT sla_date, sla_time, run_nme FROM C_DRIVER_SCHEDULE WHERE run_nme = '" + req.body.runName + "' ", function(err, rows){
          if(err){
            res.send("Error response");
          }
          else{
            res.send(rows);
          }
        });
      }
    });
  });
});

app.put('/update/histoy_SLA', function(req, res) {
    console.log(req.body);
    res.end();
});

app.put('/update/status_name_grpNumder', function(req, res) {
  db.serialize(function() {
    db.all("UPDATE C_DRIVER_STEP_DETAIL SET run_stts_cd = '" + req.body.Status + "' WHERE run_name = '" + req.body.runName + "' AND grp_nbr = " + req.body.grp_number + " ", function(err){
        if(err){
          res.send("Error when querrying");
        }
        else {
          db.all("SELECT run_stts_cd, run_name, grp_nbr FROM C_DRIVER_STEP_DETAIL WHERE run_stts_cd = '" + req.body.Status + "' AND run_name = '" + req.body.runName + "' AND grp_nbr = " + req.body.grp_number + " ", function(err, rows){
            if(err){
              res.send("Error response");
            }
            else{
              res.send(rows);
            }
          });
        }
    });
  });
});

//DEMO
app.put('/update/status_name_dtlID', function(req, res) {
  db.serialize(function() {
    db.all("UPDATE C_DRIVER_STEP_DETAIL SET run_stts_cd = '" + req.body.Status + "' WHERE run_name = '" + req.body.runName + "' AND drvr_step_dtl_id = " + req.body.dtl_id + " ", function(err){
      if(err){
        res.send("Error when querrying");
      }
      else {
        db.all("SELECT * FROM C_DRIVER_STEP_DETAIL WHERE drvr_step_dtl_id = " + req.body.dtl_id + " ", function(err, rows){
          if(err){
            res.send("Error response");
          }
          else{
            res.send(rows);
          }
        });
      }
    });
  });
});

app.put('/update/active_step_indicator_stepID', function(req, res) {
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
            res.send(rows);
          }
        });
      }
    });
  });
});

app.put('/update/active_step_indicator_runName_stepID', function(req, res) {
  db.serialize(function() {
    db.all("UPDATE C_DRIVER_STEP SET actv_step_ind = '" + req.body.actv_step_ind + "' WHERE run_nme = '" + req.body.runName + "' AND drvr_step_id = '" + req.body.drvr_step_id + "' ", function(err){
      if(err){
        res.send("Error when querrying");
      }
      else {
        db.all("SELECT * FROM C_DRIVER_STEP WHERE drvr_step_id = " + req.body.drvr_step_id + " ", function(err, rows){
          if(err){
            res.send("Error response");
          }
          else{
            res.send(rows);
          }
        });
      }
    });
  });
});

app.put('/update/active_step_indicator_runName', function(req, res) {
  db.serialize(function() {
    db.all("UPDATE C_DRIVER_STEP SET actv_step_ind = '" + req.body.actv_step_ind + "' WHERE run_nme = '" + req.body.runName + "' ", function(err){
      if(err){
        res.send("Error when querrying");
      }
      else {
        db.all("SELECT actv_step_ind, run_nme FROM C_DRIVER_STEP WHERE actv_step_ind = '" + req.body.actv_step_ind + "' AND run_nme = '" + req.body.runName + "' ", function(err, rows){
          if(err){
            res.send("Error response");
          }
          else{
            res.send(rows);
          }
        });
      }
    });
  });
});

app.put('/update/active_step_indicator_runName_grpNumber', function(req, res) {
  db.serialize(function() {
    db.all("UPDATE C_DRIVER_STEP SET actv_step_ind = '" + req.body.actv_step_ind + "' WHERE run_nme = '" + req.body.runName + "' AND grp_nbr = " + req.body.grp_number + " ", function(err){
      if(err){
        res.send("Error when querrying");
      }
      else {
        db.all("SELECT actv_step_ind, run_nme, grp_nbr FROM C_DRIVER_STEP WHERE actv_step_ind = '" + req.body.actv_step_ind + "' AND run_nme = '" + req.body.runName + "' AND grp_nbr = " + req.body.grp_number + " ", function(err, rows){
          if(err){
            res.send("Error response");
          }
          else{
            res.send(rows);
          }
        });
      }
    });
  });
});



app.listen(3000, function() {
    console.log("App listening on port 3000");
});
