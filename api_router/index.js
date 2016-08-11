module.exports = function(api){
  api.use('/id', require('./routes/one'));
  api.use('/type',require('./routes/type'));
  api.use('/',require('./routes/all'));
};
