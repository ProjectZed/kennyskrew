var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var router = express.Router();
var log = require('log4js').getLogger("index");
var users = new sqlite3.Database(__dirname + "/../server/database/Users.db");

/*router config*/

/* GET home page. */
router.get('/',checkLogin);
router.get('/', function(req, res) {
	console.log('index');
  res.render('index');
});

// router.get('/login',checkNotLogin);
router.get('/login',function(req,res){
	res.render('login/login');
});

router.post('/login', function(req, res) {
	console.log('post login');
	console.log(req.url);
  users.serialize(function() {
    users.all("SELECT * FROM user_info WHERE username = '" + req.body.username + "' AND password = '" + req.body.password + "' ", function(err, rows){
        if(err){
          console.log("Fail authenticate");
        }
        else {
          var user = {
						username : req.body.username,
						password : req.body.password
					}
					req.session.user = user;
          res.redirect('/');
					//res.render('index');
        }
    });
  });
});


router.get("/logout", checkLogin);
router.get('/logout',function(req,res,next){
	req.session.user=null;
	req.flash('success', 'exit successfully');
	res.redirect('/');
});

/*router config end*/


/*router.post('/login',checkNotLogin);
router.post('/login',function(req,res,next){
	userDao.queryById(req, res, next);
});*/

router.post('/register',function(req,res,next){
	userDao.add(req, res, next);
});

// check user login status
function checkNotLogin(req,res,next){
	if(req.session.user){
		req.flash('error','User already login');
		return res.redirect('/');
	}
	next();
}

function checkLogin(req,res,next){
	console.log('checkLogin');
	//log.debug(req.session.user);
	if(!req.session.user){
		console.log(req.session.user);
		return res.redirect('/login');
	}
	next();
}
module.exports = router;
