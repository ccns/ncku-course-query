var JsonDB = require('node-json-db');
var db = new JsonDB("indexContent", true, false);
var config = require('config');

var parser = require('./parser.js');

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var url = config.get('mongo.url');

function update() {
  parser.getIndexContent(function(content) {
    db.push("/menus", content.menu);
    db.push("/deptList", content.deptList);
  });
}

function get(path) {
  var content = db.getData(path);
  return content;
}

function getDepts() {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    var collection = db.collection('depts');
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      return callback(docs);
    });
  })
}

function getCourses(dept, callback) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    var collection = db.collection('courses');
    collection.find({"dept_no": dept}).toArray(function(err, docs) {
      assert.equal(err, null);
      return callback(docs);
    });
  })
}

export {get, update, getDepts, getCourses};
