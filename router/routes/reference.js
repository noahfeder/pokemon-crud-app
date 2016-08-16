const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL || 'postgres://stavro510@localhost:5432/poke_crud');

router.get('/types',function(req,res){
  db.any(
    'SELECT * FROM types;'
  ).catch(function(error){
    res.send(error);
  })
  .then(function(data){
    if (req.session.user) {
      res.render('types/index',{types:data,logged_in:true, color:req.session.color});
    } else {
      res.render('types/index',{types:data,logged_in:false});
    }

  });
});

router.get('/types/:type',function(req,res) {
  var type = req.params.type;
  db.any(
    'SELECT * FROM types WHERE type_name = $1; SELECT * FROM types;',
    [type]
  ).catch(function(error) {
    console.log(error);
  }).then(function(data){
    if (req.session.user) {
      res.render('types/show',{type:data[0],types:data.slice(1),logged_in:true, color:req.session.color});
    } else {
      res.render('types/show',{type:data[0],types:data.slice(1),logged_in:false});
    }

  });
});

function validateName(str) {
  str = str.toLowerCase();
  if (str.indexOf('mime') > -1) {
    return str.replace(/\. |\.%20|\.| |%20/g,'-');
  } else if (str.indexOf('farfetch') > -1) {
    return str.replace(/'/g,'');
  } else if (str.indexOf('nidoran') > -1) {
    return str.replace(/ |%20/g,'');
  } else {
    return str;
  }
}

router.get('/pokemon',function(req,res) {
  if (req.query.type) {
    db.any('SELECT type_name FROM types; SELECT * FROM pokemon WHERE type = $1;',[req.query.type])
    .catch(function(error){
      res.redirect('/');
    })
    .then(function(data){
      if (req.session.user) {
        res.render('pokemon/index',{types:data.slice(0,18),pokemon:data.slice(18),logged_in:true, color:req.session.color});
      } else {
        res.render('pokemon/index',{types:data.slice(0,18),pokemon:data.slice(18),logged_in:false});
      }
    })
  } else {
    db.any('SELECT type_name FROM types; SELECT * FROM pokemon;')
    .catch(function(error){
      res.redirect('/')
    })
    .then(function(data){
      if (req.session.user) {
        res.render('pokemon/index',{types:data.slice(0,18),pokemon:data.slice(18),logged_in:true, color:req.session.color});
      } else {
        res.render('pokemon/index',{types:data.slice(0,18),pokemon:data.slice(18),logged_in:false});
      }
    })
  }

})

router.get('/pokemon/:id',function(req,res) {
  var poke_id = parseInt(req.params.id);
  if (poke_id > 0 && poke_id < 152) {
    db.one('SELECT * FROM pokemon WHERE poke_id = $1',[poke_id])
      .catch(function(error){
        res.redirect('/')
      })
      .then(function(data){
        if (req.session.user) {
          res.render('pokemon/show',{pokemon:data,logged_in:true, color:req.session.color})
        } else {
          res.render('pokemon/show',{pokemon:data,logged_in:false})
        }
      });
  } else {
    var name = validateName(req.params.id);
    db.one('SELECT * FROM pokemon WHERE img_name = $1',[name])
      .catch(function(error) {
        res.redirect('/')
      }).then(function(data) {
        if (req.session.user) {
          res.render('pokemon/show',{pokemon:data,logged_in:true, color:req.session.color})
        } else {
          res.render('pokemon/show',{pokemon:data,logged_in:false})
        }
      })
  }
});

module.exports = router;
