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
	var user = null;
	if(req.session.user)
		user = { user: req.session.user};
  res.render('index.html', user);
});

// router.get('/login',checkNotLogin);
router.get('/login',function(req,res){
	res.render('login/login.html');
});

router.post('/login', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if(typeof(username) === 'undefined' ||
			typeof(password) === 'undefined' ||
			username.length == 0 || !username.trim() ||
			password.length == 0 || !password.trim()){
				if(typeof(username) === 'undefined' &&
						typeof(password) === 'undefined'){
						res.status(200).send("Both username and password are incorrect.");
					}
				else if(typeof(username) === 'undefined'){
					res.status(200).send("No Such User");
				}
				else if(typeof(password) === 'undefined'){
					res.status(200).send("Password Incorrect");
				}
	}else{
  	users.serialize(function() {
    users.all("SELECT * FROM user_info WHERE username = '" + username + "'", function(err, rows){
        if(err){
          console.log("Fail authenticate");
        }
        else {
					if(rows.length > 0){
						var user = rows[0];
						if(user.password === password){
								var user = {
									username : user.username,
									password : user.password,
									email: user.email,
									type : user.type
								}
								req.session.user = user;
								req.session.save();
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
	if(!req.session.user){
		console.log(req.session.user);
		return res.redirect('/login');
	}
	next();
}

router.get('/Logs/:filename', function(req, res) {
	var prefix = "./logs/";
	fs.stat(prefix + req.params.filename, function(err, stats) {
  	if(err){
    	res.send("There is no logs in such day.")
		}else{
			LogController.readLog(req.params.filename, (result) => {
		    var array = result.toString().split("\n");
				var reverseArr = array.slice(0, array.length-1).reverse();
				for(var index = 0; index < reverseArr.length; index++){
					reverseArr[index] = reverseArr[index].split(",");
					reverseArr[index] = {
						time: reverseArr[index][0],
						permission: reverseArr[index][1],
						username: reverseArr[index][2],
						macro: reverseArr[index][3],
						urgent: reverseArr[index][4],
						comment: reverseArr[index][5],
						deny: reverseArr[index][6] == undefined ? 0 : 1
					};
				}
		  	res.send(reverseArr);
		  });
		}
	});

});

module.exports = router;
