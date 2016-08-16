const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();

const db = pgp(process.env.DATABASE_URL);


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

router.get('/',function(req,res) {
  if (req.query.type) {
    db.any('SELECT * FROM pokemon WHERE type = $1',[req.query.type])
    .catch(function(error){
      res.send(error);
    })
    .then(function(data){
      res.json(data);
    })
  } else {
    db.any('SELECT * FROM pokemon;')
    .catch(function(error){
      res.send(error);
    })
    .then(function(data){
      res.json(data);
    })
  }

})

router.get('/:id',function(req,res) {
  var poke_id = parseInt(req.params.id);
  if (poke_id > 0 && poke_id < 152) {
    db.one('SELECT * FROM pokemon WHERE poke_id = $1',[poke_id])
      .catch(function(error){
        res.send(error);
      })
      .then(function(data){
        res.json(data);
      });
  } else {
    var name = validateName(req.params.id);
    db.one('SELECT * FROM pokemon WHERE img_name = $1',[name])
      .catch(function(error) {
        res.send(error);
      }).then(function(data) {
        res.json(data);
      })
  }
});



module.exports = router;
