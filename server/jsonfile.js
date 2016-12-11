var jsonfile = require('jsonfile')
var fileName = './database/pending.json';
fs = require('fs');
//stack
fs.closeSync(fs.openSync(fileName, 'a'));

var writeBuffer = [];

var writeToFile = function(input) {
  if(copy)
    writeBuffer = copy;
  writeBuffer.push(input);
  console.log("writebuffer: ",writeBuffer);
  jsonfile.writeFile(fileName, writeBuffer, function (err) {
    if (err){
      return console.log("write error: ",err);
    }
  })
}

var readFromFile = function() {
  var close = fs.openSync(fileName,"r");
  fs.readFile(fileName, 'utf8', function (err,obj) {
    if (err){
      fs.closeSync(close);
      return console.log("read error: ",err);
    }
    fs.closeSync(close);
    console.log("object: ",obj);
    return obj;
  })
}
var copy = readFromFile();

module.exports = {
  writejson: function(input){
    return writeToFile(input);
  },
  readjson: function(){
    var result = readFromFile();
    console.log("result: ",result);
    return result;
  },
  eraseFile: function() {
    fs.closeSync(fs.openSync(fileName, 'w'));
  }
};
var testJson = module.exports;
console.log("test write hello");
testJson.writejson({Hello:'World'});
console.log("Test read: " + testJson.readjson());
