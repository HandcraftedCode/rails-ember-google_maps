App.Adapter = DS.RESTAdapter.extend({
  bulkCommit: false
});

App.Adapter.map('App.Gig', {
  attachments: {embedded: 'always'}
});

App.Store = DS.Store.extend({
  revision: 11,
  adapter: App.Adapter.create()
});
