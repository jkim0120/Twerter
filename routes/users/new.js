var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints : ['127.0.0.1']});
client.connect(function(err, result) {
  console.log('Cassandra Connected - New User');
});

var getByUsername = 'SELECT * FROM twerter.users WHERE username = ?';

router.get('/', function(req, res) {
  res.render('new_user');
});

module.exports = router;
