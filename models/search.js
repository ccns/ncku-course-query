var config = require('config');
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: config.get('elasticsearch.host'),
  // log: 'trace'
});

function search(q, success, fail) {
  client.search({
    index: 'ncku-course-db',
    type: 'courses',
    body: q
  }).then(success, fail);
}

export default search;
