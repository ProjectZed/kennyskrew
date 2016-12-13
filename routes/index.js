var express = require('express');
var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();
var log = require('log4js').getLogger("index");
var db = new sqlite3.Database(__dirname + "/../server/database/LibertyMutual.db");
var users = new sqlite3.Database(__dirname + "/../server/database/Users.db");
var LogController = require("./logController");

/*router config*/
/* GET home page. */
router.get('/',checkLogin);
router.get('/', function(req, res) {
	console.log('get index');
	console.log(req.session.user);
	var user = null;
	if(req.session.user)
		user = { user: req.session.user};
  res.render('index.html', user);
});

// router.get('/login',checkNotLogin);
router.get('/login',function(req,res){
	console.log('get login page');
	res.render('login/login.html');
});

router.post('/login', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
<<<<<<< HEAD
<<<<<<< HEAD
	if(typeof(username) === 'undefined' ||
			typeof(password) === 'undefined' ||
			username.length == 0 || !username.trim() ||
			password.length == 0 || !password.trim()){
				console.log('Empty username or password');
				if(typeof(username) === 'undefined' &&
						typeof(password) === 'undefined'){
							console.log('1');
<<<<<<< HEAD
						res.status(200).send("Both username and password are incorrect.");
					}
				else if(typeof(username) === 'undefined'){
					console.log('2');
					res.status(200).send("No Such User");
				}
				else if(typeof(password) === 'undefined'){
					console.log('3');
					res.status(200).send("Password Incorrect");
				}
=======
	if(username.length == 0 || !username.trim() ||
			password.length == 0 || !password.trim() ||
			typeof(username) === undefined || typeof(password) === undefined){
				console.log('0000');
				console.log(username.length);
				console.log(password.length);
				console.log(username.trim());
				console.log(password.trim());
>>>>>>> login page style updateing
=======
	if(typeof(username) === 'undefined' ||
			typeof(password) === 'undefined' ||
			username.length == 0 || !username.trim() ||
			password.length == 0 || !password.trim()){
				console.log('Empty username or password');
>>>>>>> fixed check for undefined in login
=======
						res.status(404).send("Both username and password are incorrect.");
					}
				else if(typeof(username) === 'undefined'){
					console.log('2');
					res.status(404).send("No Such User");
				}
				else if(typeof(password) === 'undefined'){
					console.log('3');
					res.status(404).send("Password Incorrect");
				}
>>>>>>> update login border
	}else{
  	users.serialize(function() {
    users.all("SELECT * FROM user_info WHERE username = '" + username + "'", function(err, rows){
        if(err){
          console.log("Fail authenticate");
        }
        else {
					console.log('rows');
					if(rows.length > 0){
						console.log('row more than 0');
						var user = rows[0];
						if(user.password === password){
								var user = {
									username : user.username,
									password : user.password,
									type : user.type
								}
								req.session.user = user;
								res.status(200).send(user);
						}else{
							res.status(200).send("Password Incorrect");
						}
					}else{
						res.status(200).send("No Such User");
					}
        }
    });
  });
}
});

router.get('/logout',function(req,res){
	console.log('logging out');
	req.session.user=null;
	res.redirect("/login");
});

/*router config end*/

// check user login status
function checkNotLogin(req,res,next){
	console.log('check for not login');
	if(req.session.user){
		console.log('redirect to index');
		return res.redirect('/');
	}
	next();
}

function checkLogin(req,res,next){
	console.log('checkLogin');
	log.debug(req.session.user);
	if(!req.session.user){
		console.log(req.session.user);
		return res.redirect('/login');
	}
	next();
}

router.get('/Logs', function(req, res) {
  LogController.readLog((result) => {
    var array = result.toString().split("\n");
  	res.send(array.slice(0, array.length-1));
  });
});

module.exports = router;
