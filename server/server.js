var express  = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../gui"));



app.put('/update/scheduleStartTime', function(req, res) {
    console.log(req.body);
    res.end();
});

app.put('/update/statusCode', function(req, res) {
    console.log(req.body);
    res.end();
});

app.put('/update/valuationEnd', function(req, res) {
    console.log(req.body);
    res.end();
});

app.put('/update/valuationStart', function(req, res) {
    console.log(req.body);
    res.end();
});

app.put('/update/sla_by_audit', function(req, res) {
    console.log(req.body);
    res.end();
});

app.put('/update/sla_by_runname', function(req, res) {
    console.log(req.body);
    res.end();
});

app.put('/update/histoy_SLA', function(req, res) {
    console.log(req.body);
    res.end();
});

app.put('/update/status_name_grpNumder', function(req, res) {
    console.log(req.body);
    res.end();
});

app.put('/update/status_name_dtlID', function(req, res) {
    console.log(req.body);
    res.end();
});

app.put('/update/active_step_indicator_stepID', function(req, res) {
    console.log(req.body);
    res.end();
});

app.put('/update/active_step_indicator_runName_stepID', function(req, res) {
    console.log(req.body);
    res.end();
});

app.put('/update/active_step_indicator_runName', function(req, res) {
    console.log(req.body);
    res.end();
});

app.put('/update/active_step_indicator_runName_grpNumber', function(req, res) {
    console.log(req.body);
    res.end();
});



app.listen(3000, function() {
    console.log("App listening on port 3000");
});
