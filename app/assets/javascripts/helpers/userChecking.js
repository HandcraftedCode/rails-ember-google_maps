Handlebars.registerHelper('ifOwner', function(userid, contactid, options) {
  if(userid == contactid) {
    return options.fn(this);
  }
  return options.inverse(this);
});