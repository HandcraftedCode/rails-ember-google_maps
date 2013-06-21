App.GigRoute = Ember.Route.extend({


  setupController: function(controller, model) {
  console.log('entered GigRoute with controller of ' + controller);
  console.log('the gigroutes controllers model is ' + controller.get('model'));
  console.log('the gigroutes controllers content is ' + controller.get('content'));
    // reset editing state
    // note: this is necessary here because `deactivate` won't be called when transitioning
    //       from one GigRoute directly into another
    if (controller.get('isEditing')) {
      controller.stopEditing();
    }

    // highlight this gig as active
    this.controllerFor('gigs').set('activeGigId', model.get('id'));
    var theId = this.controllerFor('gigs').get('activeGigId');
    console.log('current gig in gigs model is ' + theId);
    this.set('content', controller.get('model'));
  },
  
  renderTemplate: function() {
    
    // Render the `icontent` template into
    // the outlet `gigModal`, and display the `gig`
    // controller.
    this.render('gig', {
    	into: 'gigs',
      outlet: 'gigModal'
    });
    console.log('gig template loaded');
    
    console.log('modal now visible')
  },

  deactivate: function() {
    var controller = this.controllerFor('gig');

    // reset editing state
    if (controller.get('isEditing')) {
      controller.stopEditing();
    }

    // un-highlight the active gig (perhaps temporarily)
    this.controllerFor('gigs').set('activeGigId', null);
  }
});
