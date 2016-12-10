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

//temporary session, might be deleted later for Active Directory
app.use(cookieParser());
var session = require('express-session');
var redisStore = require('connect-redis')(session);
app.use(session({
  secret:'recommand 128 bytes random string',
  cookie: {maxAge:60 * 1000 * 10} //10 mins
}));

//log4js
log4js.configure('./conf/my_log4js_configuration.json',{});
var logger = log4js.getLogger('nomel');
logger.setLevel('INFO');

app.set('views', path.join(__dirname, '../views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');// app.set('view engine', 'ejs');

//your database location
var db = new sqlite3.Database(__dirname + "/../server/database/LibertyMutual.db");

//user table
var users = new sqlite3.Database(__dirname + "/../server/database/Users.db");
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
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(log4js.connectLogger(logger, {level: 'auto', format:':method :url'}));


app.use('/', routes);

//-----------------------------------------------------------------------------
// MACROS Routes
//-----------------------------------------------------------------------------



app.listen(3000, function() {
    console.log("App listening on port 3000");
});
