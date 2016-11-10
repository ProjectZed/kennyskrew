var express = require('express');
var userDao = require('../dao/userDao');
var router = express.Router();
var log = require('log4js').getLogger("index");

/*router config*/

/* GET home page. */
router.get('/',checkLogin);
router.get('/', function(req, res, next) {
	posts = [];
	// res.render('index',{
	// 		title:'Index',
	// 		posts:posts,
	// 		user: req.session.user,
	//         success : req.flash('success').toString(),
	//         error : req.flash('error').toString()
	// 	})
    res.render('main/index');
});

// router.get('/login',checkNotLogin);
router.get('/login',function(req,res,next){
	console.log("app.usr local");
  	res.locals.message = '';
  	var err = req.session.error;
	delete req.session.error;
  	if (err) res.locals.message = '<div class="alert alert-error">' + err + '</div>';
	res.render('login/login');
});

router.get('/M_UD_DR_SCHED_START_RN_AID',function(req,res,next){
	res.render('update/driver_schedule/M_UD_DR_SCHED_START_RN_AID');
});

router.get('/M_UD_DR_SCHED_STTS_RN_AID',function(req,res,next){
	res.render('update/driver_schedule/M_UD_DR_SCHED_STTS_RN_AID');
});

router.get('/M_UD_DR_SCHED_VAL_END_RN_AID',function(req,res,next){
	res.render('update/driver_schedule/M_UD_DR_SCHED_VAL_END_RN_AID');
});

router.get('/M_UD_DR_SCHED_VAL_START_RN_AID',function(req,res,next){
	res.render('update/driver_schedule/M_UD_DR_SCHED_VAL_START_RN_AID');
});

router.get('/M_UD_DR_SCHED_SLA_AID',function(req,res,next){
	res.render('update/driver_schedule/M_UD_DR_SCHED_SLA_AID');
});

router.get('/M_UD_DR_SCHED_SLA_RN',function(req,res,next){
	res.render('update/driver_schedule/M_UD_DR_SCHED_SLA_RN');
});

router.get('/M_UD_DR_SCHED_H_SLA_RN',function(req,res,next){
	res.render('update/driver_schedule/M_UD_DR_SCHED_H_SLA_RN');
});

router.get('/M_UD_DR_STEP_DTL_RN_GN',function(req,res,next){
	res.render('update/driver_step/M_UD_DR_STEP_DTL_RN_GN');
});

router.get('/M_UD_DR_STEP_DTL_RN_STP_DTL_ID',function(req,res,next){
	res.render('update/driver_step/M_UD_DR_STEP_DTL_RN_STP_DTL_ID');
});

router.get('/M_UD_DR_STEP_ASI_SID',function(req,res,next){
	res.render('update/driver_step_detail/M_UD_DR_STEP_ASI_SID');
});

router.get('/M_UD_DR_STEP_ASI_RN_SID',function(req,res,next){
	res.render('update/driver_step_detail/M_UD_DR_STEP_ASI_RN_SID');
});

router.get('/M_UD_DR_STEP_ASI_RN',function(req,res,next){
	res.render('update/driver_step_detail/M_UD_DR_STEP_ASI_RN');
});

router.get('/M_UD_DR_STEP_ASI_RN_GN',function(req,res,next){
	res.render('update/driver_step_detail/M_UD_DR_STEP_ASI_RN_GN');
});

router.get('/M_DL_DR_SCHED_RN',function(req,res,next){
	res.render('delete/driver_schedule/M_DL_DR_SCHED_RN');
});

router.get('/M_DL_DR_STEP_RN',function(req,res,next){
	res.render('delete/driver_step/M_DL_DR_STEP_RN');
});

router.get('/M_DL_DR_STEP_RN_GN',function(req,res,next){
	res.render('delete/driver_step/M_DL_DR_STEP_RN_GN');
});

router.get('/M_DL_DR_STEP_RN_SID',function(req,res,next){
	res.render('delete/driver_step/M_DL_DR_STEP_RN_SID');
});

router.get('/M_DL_DR_STEP_DTL_RN',function(req,res,next){
	res.render('delete/driver_step_detail/M_DL_DR_STEP_DTL_RN');
});

router.get('/addDriverScedule',function(req,res,next){
	res.render('add/addDriverScedule');
});

router.get('/addDriverStep',function(req,res,next){
	res.render('add/addDriverStep');
});

router.get('/viewfailures',function(req,res,next){
	res.render('view/failures');
});

router.get('/undo',function(req,res,next){
	res.render('view/undo');
});

router.get('/peerReview',function(req,res,next){
	res.render('view/peerReview');
});

router.get('/index',function(req,res,next){
	res.render('main/index');
});

router.get('/register',function(req,res,next){
	res.render('register/register');
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


router.post('/login',checkNotLogin);
router.post('/login',function(req,res,next){
	userDao.queryById(req, res, next);
});

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
	log.debug(req.session.user);
	if(!req.session.user){
		console.log(req.session.user);
		req.flash('error','User not login yet');
		return res.redirect('/login');
	}
	next();
}
module.exports = router;
