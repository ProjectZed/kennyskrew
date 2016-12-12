module.exports = function(app, globalConfig){
  app.get('/joey', function (req, res) {
    res.send('hello world')
  });
}
//https://www.hacksparrow.com/how-to-write-node-js-modules.html

//http://javascript.tutorialhorizon.com/2014/09/20/organizing-your-expressjs-routes-in-separate-files/
module.exports = function(name, age) {

    this.name = name;
    this.age = age;

    this.get_name = function() {
        return this.name;
    }

    this.get_age = function() {
        return this.age;
    }
};
