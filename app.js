const express = require('express');
const app = express();
const mustache = require('mustache-express');
const pgp = require('pg-promise')();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-as-promised');
const session = require('express-session');


const db = pgp(process.env.DATABASE_URL);

app.engine('html', mustache());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.set('port',(process.env.PORT||5000));

app.use(session({
  secret: 'demo-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
});

app.listen(app.get('port'),function(){
  console.log('Running on port ',app.get('port'));
});

const router = require('./router')(app);

