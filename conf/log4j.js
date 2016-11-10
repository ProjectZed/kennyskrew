var log4js = require('log4js');

//log4js
log4js.configure({
  appenders: [
    { type: 'console' }, //control output
    {
      type: 'file', //file output
      filename: 'logs/access.log',
      maxLogSize: 1024,
      backups:3,
      category: 'normal'
    }
  ],
  replaceConsole : true   //console to log
});
var logger = log4js.getLogger('normal');
