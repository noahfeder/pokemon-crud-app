module.exports = function(app) {
  app.use('/pokemon',require('./routes/pokemon'));
  app.use('/types',require('./routes/types'));
  app.use('/users',require('./routes/users'));
  app.use('/images',require('./routes/images'));
  app.use('/', require('./routes/teams'));
};
