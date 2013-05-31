App.Gig = DS.Model.extend({
  name: DS.attr('string'),
  lat: DS.attr('number'),
  lng: DS.attr('number'),
  start: DS.attr('string'),
  end: DS.attr('string'),
  email: DS.attr('string'),
  notes: DS.attr('string'),
  externalUrl: DS.attr('string'),
  userIsGoing: DS.attr('boolean'),
  ticketUrl: DS.attr('string'),
  promoted: DS.attr('boolean'),
  cat1: DS.attr('string'),
  cat2: DS.attr('string'),
  pricelower: DS.attr('number'),
  pricehigher: DS.attr('number'),
  user_id: DS.attr('string')
});