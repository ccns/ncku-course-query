var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')

var swig  = require('swig');
var React = require('react');
var Router = require('react-router');
var routes = require('./app/routes');

var db = require('./models/db');
var search = require('./models/search')

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/api/links', function(req, res, next) {
  var data = db.get('/links');
  res.send(data);
});

app.get('/api/deptlist', function(req, res, next) {
  // var data = db.get('/deptList');
  db.getDepts(function(data) {
    res.send(data);
  })
});

app.post('/api/search', function(req, res, next) {
  if (!req.body) return res.sendStatus(400);
  var data = search(req.body,
      function (resp) {
        var hits = resp.hits.hits;
        res.send(hits);
      }, function (err) {
        console.trace(err.message);
        res.send(err.message);
      });
});

app.get('/api/course/:dept', function(req, res, next) {
  var dept = req.params.dept;
  db.getCourses(dept, function(result) {
    res.send(result);
  });
});

app.use(function(req, res) {
  Router.run(routes, req.path, function(Handler) {
    var html = React.renderToString(React.createElement(Handler));
    var page = swig.renderFile('views/index.html', { html: html });
    res.send(page);
  });
});

app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

