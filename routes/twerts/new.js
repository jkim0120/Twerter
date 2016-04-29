var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints : ['127.0.0.1']});
client.connect(function(err, result) {
  console.log('Cassandra Connected - New Twert');
});

var upsertTwert = 'INSERT INTO twerter.users(username, password, email, full_name) VALUES (?, ?, ?, ?)';

router.post('/', function(req, res) {
  var uuid = cassandra.types.uuid();
  var timeuuid = cassandra.types.timeuuid();

  var queries = [
    {
      query: 'INSERT INTO twerter.twerts(twert_id, username, body) VALUES (?, ?, ?)',
      params: [uuid, req.body.username, req.body.body]
    },
    {
      query: 'INSERT INTO twerter.usertwerts(username, twert_id, body) VALUES (?, ?, ?)',
      params: [req.body.username, timeuuid, req.body.body]
    }
  ];

  client.batch(queries, {}, function(err) {
    if (err) {
      res.status(500).send({msg: err});
    } else {
      res.redirect('/twerts');
    }
  });
});

module.exports = router;