App.MediaFile = DS.Model.extend({
  src: DS.attr('string'),
  format: DS.attr('string'),
  gigId: DS.belongsTo('App.Gig')
});