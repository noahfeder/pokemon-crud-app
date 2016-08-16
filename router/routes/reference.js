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
    res.render('types/index',{types:data});
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
    res.render('types/show',{type:data[0],types:data.slice(1)});
  });
})

module.exports = router;
