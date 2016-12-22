var fs = require('fs');
var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();
var log = require('log4js').getLogger("index");
var db = new sqlite3.Database(__dirname + "/../server/database/LibertyMutual.db");

module.exports = {
  writeLog: function(data) {
    var date =  new Date();
    var filename = "./logs/" + (date.getMonth()+1) + "_" + date.getDate() + "_" + date.getFullYear() + ".txt";
    var format = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + ", ";
    data = date.toLocaleString().replace(format, "") + "," + data +"\n";
    fs.appendFile(filename, data, function (err) {
      if (err) {
        return err;
      }
    })
  },
  readLog: function(filename, cb) {
    var prefix = "./logs/"
    fs.readFile(prefix + filename, (err, result) => {
      if (err) {
      } else {
        cb(result);
      }
    })
  }
}
