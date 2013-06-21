App.GigEditRoute = Ember.Route.extend({
      model: function() {
	      return this.controllerFor('gig').get('content');
      },
  init: function() {console.log('Switched to GigEdit route');
  
  
	  
  },
  
  
  setupController: function(controller) {
		
		console.log('the EditgiginmapController is set up, with the model equal to ' + controller.get('content') + '.');
		
	},
	
	renderTemplate: function() {
    
    // Render the `contact_edit` template into
    // the outlet `editContact`, and display the `editContact`
    // controller.
    this.render('edit', {
    	into: 'gigs',
      outlet: 'editGig',
      controller: 'edit'
    });
    console.log('edit template loaded');
  },


  });
