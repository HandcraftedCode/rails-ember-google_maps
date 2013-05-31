App.GigsController = Ember.ArrayController.extend({

sortProperties: ['user_id', 'name', 'lat', 'lng', 'cat1', 'cat2', 'cat3', 'notes', 'start', 'end', 'user_is_going', 'external_url', 'ticket_url', 'promoted'],
  activeGigId: null,
  needs: ["gigs.new", "filter","catsfilter", "currentUser"],
  /*cats: [Ember.Object.create({ cat: 'business', subcats: ['conference', 'meeting', 'seminar', 'trade show'] }),
  Ember.Object.create({ cat: 'film', subcats: ['screening', 'filming'] }),
  Ember.Object.create({ cat: 'food & drink', subcats: ['meal', 'networking meal', 'night out', 'social drinks'] }),
  Ember.Object.create({ cat: 'gathering', subcats: ['food', 'small party', 'medium party', 'large party'] }),
  Ember.Object.create({ cat: 'large event', subcats: ['convention', 'festival', 'spontaneous'] }),
  Ember.Object.create({ cat: 'music', subcats: ['live music', 'making music', 'listening & appreciation'] }),
  Ember.Object.create({ cat: 'shared interests', subcats: ['debate & discussion', 'gaming', 'sport'] }),
  Ember.Object.create({ cat: 'task', subcats: ['reminder', 'todo'] }),
  Ember.Object.create({ cat: 'theatre', subcats: ['live theatre', 'making theatre', 'screening'] })],*/
  
  cats: [],

  signedIn: null,
  
  
  add: null, //defined as nothing, so 'find' will be automatically displayed.
  
  /*
  <---------------->
  
  init function
  
  This preps the properties
  of the ContactsController.
  
  Includes the setting of
  the sidebar to default
  'find' mode.
  
  
  <---------------->
  */
  
  contentsChanged: function() {
	  console.log('the content of the gigscontroller changed and are now equal to: ' + this.get('content'));
  }.property('content').cacheable(),
  init: function() {
    this._super();
    this.set('content', App.Gig.find());
    console.log('add is now equal to ' + this.add);
    this.refreshCats();
    if(this.get('controllers.currentUser.content') ) {
			this.set('signedIn', true);
			console.log('user signed in is ' + this.get('signedIn'));
		}
		else {this.set('signedIn', false);
			console.log('user signed in is ' + this.get('signedIn'));
		};
  console.log('cats are now ' + this.cats);
    
  },
  
  refreshCats: function() {
   },
  
 
  
    /*
  <---------------->
  
  toAdd and toFind functions
  
  
 These determine the state of
 the sidebar. They can be called
 from the template by a button.
 The value of 'add' is used
 by the Handlebars template
 to determine which sidebar template
 to show.
  
  'find' is the default.
  
  <---------------->
  */
  
  
  
  toAdd: function() {
  console.log('someone called toAdd');
  
	  this.set('add', true);
	  console.log('add is now set to ' + this.add)
  },
  
  toFind: function() {
  console.log('someone called toFind');
	  var controller = this;
	  this.set('add', false);
	  console.log('add is now set to ' + this.add)
  },
  
  openIW: function(gigName) {
	  console.log('openIW called with gig name = ' + gigName)
  }
  
  
  
});
