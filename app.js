const express = require('express');
const app = express();
const api = express();
const mustache = require('mustache-express');
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('connect-flash');

const db = pgp('postgres://stavro510@localhost:5432/poke_crud');

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('port',(process.env.PORT||5000));



app.use(function(err, req, res, next){
  res.status(err.status || 500);
});

api.use(function(err, req, res, next){
  res.status(err.status || 500);
});

app.listen(app.get('port'),function(){
  console.log('Running on port ',app.get('port'));
});

api.listen(2020, function(){
  console.log('Listening on port 2020');
})

const router = require('./router')(app);
const api_router = require('./api_router')(api);
