var JsonDB = require('node-json-db');
var db = new JsonDB("links", true, false);
var config = require('config');

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var url = config.get('mongo.url');

function get(path) {
  var content = db.getData(path);
  return content;
}

function getDepts(callback) {
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

export {get, getDepts, getCourses};
