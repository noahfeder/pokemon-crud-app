module.exports = function(app) {
  app.use('/pokemon',require('./routes/pokemon'));
  app.use('/types',require('./routes/types'));
  app.use('/users',require('./routes/users'));
  app.use('/images',require('./routes/images'));
  app.use('/reference',require('./routes/reference'));
  app.use('/battle',require('./routes/battle'));
  app.use('/', require('./routes/teams'));
};
