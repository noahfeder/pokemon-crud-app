const express = require('express');
const router = express.Router();
const mustache = require('mustache-express');
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-as-promised');
const session = require('express-session');

const db = pgp(process.env.DATABASE_URL);

router.post('/signup', function (req, res){
  var username = req.body.username,
      password = req.body.password,
      password2 = req.body.password2,
      color = req.body.color,
      password_message = 'Passwords must match.',
      user_message = 'Username not available.';
  if (password !== password2) {
    res.json({logged_in:false,error:password_message});
  } else {
    bcrypt.hash(password,10)
      .then(function(password_hashed) {
        db.one(
          'INSERT INTO users(username,password_hashed,color) VALUES ($1,$2,$3) RETURNING *;',
          [username,password_hashed,color]
        ).catch(function(error) {
          res.json({logged_in:false,error:user_message});
        }).then(function(user){
          req.session.user = user.user_id;
          req.session.color = user.color;
          res.json({logged_in:true,color:req.session.color});
        })
    });
  }

});

router.post('/login', function (req, res){
  var username = req.body.username,
      password = req.body.password,
      error_message = 'Invalid username/password';
  db.one(
    'SELECT * FROM users WHERE username = $1',
    [username]
    ).catch(function(error) {
      res.json({logged_in:false,error:error_message});
    }).then(function(user){
      bcrypt.compare(password,user.password_hashed)
        .then(function(match) {
          req.session.user = user.user_id;
          req.session.color = user.color;
          res.json({logged_in:true,color:req.session.color});
        }).catch(function(error){
          res.json({logged_in:false,error:error_message});
        })
    })
});

router.get('/logout', function (req, res){
  req.session.user = null;
  req.session.color = null;
  res.redirect('/');
});


module.exports = router;
