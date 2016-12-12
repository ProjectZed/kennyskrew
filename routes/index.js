var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();
var log = require('log4js').getLogger("index");
var db = new sqlite3.Database(__dirname + "/../server/database/LibertyMutual.db");
var users = new sqlite3.Database(__dirname + "/../server/database/Users.db");

/*router config*/
/* GET home page. */
router.get('/',checkLogin);
router.get('/', function(req, res) {
	console.log('get index');
  res.render('index');
});

// router.get('/login',checkNotLogin);
router.get('/login',function(req,res){
	console.log('get login page');
	res.render('login/login');
});

router.post('/login', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if(typeof(username) === 'undefined' ||
			typeof(password) === 'undefined' ||
			username.length == 0 || !username.trim() ||
			password.length == 0 || !password.trim()){
				console.log('Empty username or password');
				if(typeof(username) === 'undefined' &&
						typeof(password) === 'undefined'){
							console.log('1');
						res.status(404).send("Both username and password are incorrect.");
					}
				if(typeof(username) === 'undefined'){
					console.log('2');
					res.status(404).send("No Such User");
				}
				if(typeof(password) === 'undefined'){
					console.log('3');
					res.status(404).send("Password Incorrect");
				}
	}else{
  	users.serialize(function() {
    users.all("SELECT * FROM user_info WHERE username = '" + username + "'", function(err, rows){
        if(err){
          console.log("Fail authenticate");
        }
        else {
					console.log('rows');
					console.log(rows);
					if(rows.length > 0){
						console.log('row more than 0');
						var user = rows[0];
						if(user.password === password){
								var user = {
									username : user.username,
									password : user.password
								}
								req.session.user = user;
								res.status(200).send("success");
						}else{
							res.status(404).send("Password Incorrect");
						}
					}else{
						res.status(404).send("No Such User");
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

module.exports = router;
