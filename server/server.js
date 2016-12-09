var express  = require('express');
var app = express();
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
//your database location

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../gui"));
var globalConfig = new Object(); //any shared information
globalConfig.db = db;
require('./routes')(app,globalConfig);


app.listen(3000, function() {
    console.log("App listening on port 3000");
});
