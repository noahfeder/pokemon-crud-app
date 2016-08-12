const express = require('express');
const router = express.Router();
const mustache = require('mustache-express');
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-as-promised');
const session = require('express-session');

const db = pgp('postgres://stavro510@localhost:5432/poke_crud');

router.post('/', function (req, res){
  var username = req.body.username,
      password = req.body.password,
      error_message = 'Invalid username/password';
  db.one(
    'SELECT * FROM users WHERE username = $1',
    [username]
    ).catch(function(error) {
      console.log(error);
      res.json({logged_in:false,error:error_message});
    }).then(function(user){
      bcrypt.compare(password,user.password_hashed)
        .then(function(match) {
          req.session.user = user.user_id;
          res.json({logged_in:true});
        }).catch(function(error){
          res.json({logged_in:false,error:error_message});
        })
    })
});

module.exports = router;
