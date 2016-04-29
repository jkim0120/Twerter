var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints : ['127.0.0.1']});
client.connect(function(err, result) {
  console.log('Cassandra Connected - Twerts');
});

var getAllTwerts= 'SELECT * FROM twerter.twerts';

router.get('/', function(req, res) {
  client.execute(getAllTwerts, [], function(err, result) {
    if (err) {
      res.status(404).send({msg: err});
    } else {
      res.render('twerts', {
        twerts: result.rows
      });
    }
  });
});

var getUserTwerts = 'SELECT * FROM twerter.usertwerts WHERE username = ?';

router.get('/:username', function(req, res) {
  client.execute(getUserTwerts, [req.params.username], function(err, result) {
      if (err) {
        res.status(500).send({msg: err});
      } else {
        res.render('twerts', {
          twerts: result.rows
        });
      }
  })
})

module.exports = router;
