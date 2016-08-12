module.exports = function(app){
  app.use('/', require('./routes/home'));
  app.use('/login', require('./routes/login'));
  app.use('/logout', require('./routes/logout'));
  app.use('/signup', require('./routes/signup'));
  app.use('/create', require('./routes/create'));
  app.use('/delete', require('./routes/delete'));
};
