// dao/userDao.js
// interfere with MySQL
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');
var log = require('log4js').getLogger("userDao");
// databse conection pool
var pool  = mysql.createPool($conf.mysql);

// return simple json to front
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: 'Operation Fails'
		});
	} else {
		res.json(ret);
	}
};

module.exports = {
	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// get parameters from front
			var param = req.query || req.params;
			// establish connection and add data to the databse
			// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
			connection.query($sql.insert, [req.body.username, req.body.password], function(err, result) {
				log.debug(result);
				if(result) {
					// result = {
					// 	code: 200,
					// 	msg:'add successful'
					// };
					res.redirect('/login');
				}

				// return json format result to front
				// jsonWrite(res, result);


				// release connection
				connection.release();
			});
		});
	},

	delete: function (req, res, next) {
		// delete by Id
		pool.getConnection(function(err, connection) {
			var id = +req.query.id;
			connection.query($sql.delete, id, function(err, result) {
				if(result.affectedRows > 0) {
					result = {
						code: 200,
						msg:'delete successful'
					};
				} else {
					result = void 0;
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
	},
	update: function (req, res, next) {
		// update by id
		// for simple, need to pass in both username and password
		var param = req.body;
		if(param.name == null || param.age == null || param.id == null) {
			jsonWrite(res, undefined);
			return;
		}

		pool.getConnection(function(err, connection) {
			connection.query($sql.update, [param.name, param.age, +param.id], function(err, result) {
				if(result.affectedRows > 0) {
					res.render('suc', {
						result: result
					});
				} else {
					res.render('fail',  {
						result: result
					});
				}

				connection.release();
			});
		});

	},
	queryById: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryByNameAndPwd, [req.body.user, req.body.password], function(err, rows,result) {
				log.debug(rows);
				var resMap = {};
				console.log(rows);
				var id= rows[0].id+'';
				console.log(result);
				if(id){
					connection.query($sql.queryById,id,function(err,result){
						log.debug(result);
						var user={
							username : result[0].name
						};
						req.session.user = user;
						log.debug(req.session.user);
						resMap.code=0;
						resMap.data=result[0];
						res.send(resMap);
					})
				}else{
					req.session.error = 'incorrect username or password';
					return res.redirect('/login');
				}
				connection.release();
				// return result;

			});
		});
	},
	queryAll: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.queryAll, function(err, result) {
				jsonWrite(res, result);
				connection.release();
			});
		});
	}

};
