App.Attachment = DS.Model.extend({
  src: DS.attr('string'),
  format: DS.attr('string'),
  gig: DS.belongsTo('App.Gig')
});