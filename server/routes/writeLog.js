var fs = require('fs');
module.exports = {
  writeToLog: function(data) {
    var date =  new Date().toLocaleString();
    data = date + ": " + data + "\n";
    fs.appendFile('log.txt', data, function (err) {
      if (err) {
        // append failed
        //callback(err);
      } else {
        // done
        //callback(null, data);
      }
    })
  }
}
