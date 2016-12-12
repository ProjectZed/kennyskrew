module.exports = function(app, globalConfig){
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
}
