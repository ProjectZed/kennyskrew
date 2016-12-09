var express = require('express');
var router = express.Router();
var log = require('log4js').getLogger("index");

/*router config*/

/* GET home page. */
router.get('/',checkLogin);
router.get('/', function(req, res) {
	console.log('index');
  res.render('main/index');
});

// router.get('/login',checkNotLogin);
router.get('/login',function(req,res){
	console.log("app.usr local");
	res.render('login/login');
});

router.get("/home", checkLogin);
router.get('/home',function(req,res,next){
	console.log('ok');
	var user = {
		username : 'admin',
		password : 'admin'
	}
	res.locals.user = req.session.user;
	log.debug(res.locals.user);
	res.render('main/index');
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
	log.debug(req.session.user);
	if(!req.session.user){
		console.log(req.session.user);
		return res.redirect('/login');
	}
	next();
}
module.exports = router;
