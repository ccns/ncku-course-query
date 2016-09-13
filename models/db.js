var JsonDB = require('node-json-db');
var db = new JsonDB("indexContent", true, false);

var parser = require('./parser.js');
 
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

module.exports = {get: get, update: update};
