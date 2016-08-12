module.exports = function(api){
  api.use('/id', require('./routes/id'));
  api.use('/name',require('./routes/name'));
  api.use('/type',require('./routes/type'));
  api.use('/',require('./routes/all'));
};
