var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints : ['127.0.0.1']});
client.connect(function(err, result) {
  console.log('Cassandra Connected - Edit User');
});

var getByUsername = 'SELECT * FROM twerter.users WHERE username = ?';

router.get('/:username', function(req, res) {
  client.execute(getByUsername, [req.params.username], function(err, result) {
    if (err) {
      res.status(500).send({msg: err});
    } else {
      res.render('edit_user', {
        username: result.rows[0].username,
        email: result.rows[0].email,
        full_name: result.rows[0].full_name,
        password: result.rows[0].password
      });
    }
  });
});

var upsertUser = 'INSERT INTO twerter.users(username, password, email, full_name) VALUES (?, ?, ?, ?)';

router.post('/', function(req, res) {
  client.execute(upsertUser, [req.body.username, req.body.password, req.body.email, req.body.full_name],
    function(err, result) {
      if (err) {
       res.status(500).send({msg: err});
      } else {
        res.redirect('/user/' + req.body.username);
      }
    });
});

module.exports = router;
