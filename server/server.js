var express  = require('express');
var app = express();
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();

//your database location
var db = new sqlite3.Database(__dirname + "/../server/database/LibertyMutual.db");

//user table
var users = new sqlite3.Database(__dirname + "/../server/database//Users.db");
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
app.use(express.static(__dirname + "/../gui"));
var globalConfig = new Object(); //any shared information
globalConfig.db = db;
require('./routes')(app,globalConfig);

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

app.listen(3000, function() {
    console.log("App listening on port 3000");
});
