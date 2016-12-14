var fs = require('fs');
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();
var log = require('log4js').getLogger("index");
var db = new sqlite3.Database(__dirname + "/../server/database/LibertyMutual.db");

module.exports = {
  writeToLog: function(data) {
    var date =  new Date().toLocaleString();
    data = date + ": " + data +"\n";
    fs.appendFile('log.txt', data, function (err) {
      if (err) {
        // append failed
        //callback(err);
      } else {
        // done
        //callback(null, data);
      }
    })
  }
}
