var express = require('express');
var path = require('path');

var swig  = require('swig');
var React = require('react');
var Router = require('react-router');
var routes = require('./app/routes');

var db = require('./models/db');
var parser = require('./models/parser');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var url = "mongodb://crawler:ccnsccns@140.116.252.148:27017/ncku-course-db";

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/menus', function(req, res, next) {
  var data = db.get('/menus');
  res.send(data);
});

app.get('/api/deptlist', function(req, res, next) {
  var data = db.get('/deptList');
  res.send(data);
});

app.get('/api/course/:dept', function(req, res, next) {
  var dept = req.params.dept;
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    var collection = db.collection('courses');
    collection.find({"dept_no": dept}).toArray(function(err, docs) {
      assert.equal(err, null);
      res.send(docs);
    });
  })
  // parser.getCourseContent(dept, function(data) {
  //   res.send(data);
  // });
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

