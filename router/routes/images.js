const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();
const request = require('request');

var key = process.env.BING_KEY || '74bf21042eb74e15948d8477e65b4c9d';

router.get('/:queries',function(req,res) {
  var queries = req.params.queries
  var options = {
    url: 'https://api.cognitive.microsoft.com/bing/v5.0/images/search/?size=wallpaper&' + queries,
    headers: {'Ocp-Apim-Subscription-Key' : key}
  };
  function cb(err,response,body) {
    var data = JSON.parse(body);
    res.json(data);
  }
  request(options,cb);
})


module.exports = router;
