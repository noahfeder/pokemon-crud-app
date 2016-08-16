const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const db = pgp(process.env.DATABASE_URL);

router.get('/',function(req,res) {
  db.any('SELECT * FROM types;')
    .catch(function(error){
      res.send(error);
    })
    .then(function(data){
      res.json(data);
    });
});

router.get('/:type',function(req,res) {
  var type = req.params.type;
  db.one('SELECT * FROM types WHERE type_name = $1',[type])
    .catch(function(error){
      res.send(error);
    })
    .then(function(data){
      res.json(data);
    });
});



module.exports = router;
