var fileName = './database/pending.json';
fs = require('fs');
var JsonDB = require('node-json-db');
var db = new JsonDB("myDataBase", true, true);
//stack
//fs.closeSync(fs.openSync(fileName, 'a'));

var writeBuffer = [];

var writeToFile = function(input) {
  db.push("./pending[]",input);
}

var readFromFile = function(index) {
  if(index){
    var ind = "./pending["+index+"]";
    console.log(ind);
    //return db.getData(ind);
  }
  return db.getData("./pending[]");
}

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
//console.log("Test read: " + testJson.readjson());
