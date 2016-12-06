module.exports = function(app, globalConfig){
  app.get('/joey', function (req, res) {
    res.send('hello world')
  });
}
