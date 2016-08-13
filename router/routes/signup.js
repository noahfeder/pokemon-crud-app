const express = require('express');
const router = express.Router();
const mustache = require('mustache-express');
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-as-promised');
const session = require('express-session');

const db = pgp(process.env.DATABASE_URL || 'postgres://stavro510@localhost:5432/poke_crud');

router.post('/', function (req, res){
  var username = req.body.username,
      password = req.body.password,
      error_message = 'Cannot create user';
  bcrypt.hash(password,10)
    .then(function(password_hashed) {
      db.one(
        'INSERT INTO users(username,password_hashed) VALUES ($1,$2) RETURNING *;',
        [username,password_hashed]
        ).catch(function(error) {
          console.log(error);
          res.json({logged_in:false,error:error_message});
        }).then(function(user){
          req.session.user = user.user_id;
          res.json({logged_in:true});
        })
    });
});

module.exports = router;
