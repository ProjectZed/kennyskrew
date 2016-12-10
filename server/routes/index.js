module.exports = function(app, globalConfig){
  require('./login')(app,globalConfig);
  require('./update')(app,globalConfig);
}
