App.GigsRoute = Ember.Route.extend({
  model: function() {
    return App.Gig.find();
  },
 

  renderTemplate: function() {
  	this._super();
	  this.render('sidebar', {
	  	outlet: 'sidebar',
	  	into: 'gigs',
	  	controller: 'gigs'
	  });
	  console.log('sidebar rendered');
	  this.render('map', {
	  	into: 'gigs',
	  	outlet: 'map', //cannot connect outlet yet, acc. GitHub ember-data gist #1838 SORTED :)
	  	controller: 'map'
	  });
	  console.log('map rendered');
	  this.render('gigs.new', {
	  	outlet: 'add',
	  	into:'sidebar',
	  	controller: 'gigs.new'
	  });
	  console.log('add gig form rendered');
	  this.render('filter', {
	  	outlet: 'filter',
	  	into: 'sidebar',
	  	controller: 'filter'
	  });
	  console.log('filterview rendered')
	
	  	  	 
	  
	  
	 
	}

        
});
