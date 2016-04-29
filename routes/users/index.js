var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints : ['127.0.0.1']});
client.connect(function(err, result) {
  console.log('Cassandra Connected - Users');
});

var getUsers = 'SELECT * FROM twerter.users';

/* GET users listing. */
router.get('/', function(req, res, next) {
  client.execute(getUsers, [], function(err, result) {
    if(err) {
      res.status(404).send({msg: err});
    } else {
      res.render('users', {
        users: result.rows
      });
    }
  });
});

module.exports = router;
