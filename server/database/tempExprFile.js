var express  = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('../routes/index');
var sqlite3 = require('sqlite3').verbose();
var logger = require('morgan');
var log4js = require('log4js');
var ejs = require('ejs');
var cookieParser = require('cookie-parser');
var app = express();

//user table
var users = new sqlite3.Database("./Users.db");

users.serialize(function() {
    users.run("CREATE TABLE IF NOT EXISTS `pendingMacro` ( `id` INTEGER PRIMARY KEY AUTOINCREMENT, 'macro' TEXT, `devsEmail` TEXT, `managerEmail` TEXT, `date_of_request` TEXT , `time_of_request` TEXT)");
});

var macro  = "testdata",dev = "testdata",manager = "testdata",month_year_day = "testdata",time_of_request = "testdata";
var testdata = "testdata";
//,'"+month_year_day+"'
var pendingString = "INSERT INTO pendingMacro (`macro`,`devsEmail`,`managerEmail`,`date_of_request`,`time_of_request`) ";
var values = "VALUES ( '" +macro+"' , '"+dev+"','"+manager+"','"+time_of_request + "'  ,' " +time_of_request + "')";
//var pendingString = "INSERT INTO pendingMacro (macro) ";
//var values = "VALUES ( ' " +macro+" ' )";

users.serialize(function() {
  var ourtable = pendingString + values;
  //update + " macro = " + "tempdata"; //+ " WHERE run_nme = '" + req.body.runName + "' AND audit_id = " + req.body.auditId + " "
   users.run(ourtable, function(err){
    if(err){
      console.log(err);
      //res.send("Error when querrying");
    }
  });
});
