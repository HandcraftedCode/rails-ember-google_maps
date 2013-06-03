App.GigController = Em.ObjectController.extend({

  activeGig: function() {
  },
  isEditing: false,
  needs: ['gigs', 'edit', 'currentUser'],
signedIn: null,
  canEdit: function() {
  console.log('checking if current user is editor');
  if(App.currentUser) {
  	console.log('current user is a user');
  	console.log('the user_id of the gig is ' + this.get('model.user_id') + ' and the id of the user is ' + App.currentUser.id);
	  if(this.get('model.user_id') === App.currentUser.id.toString())
		  {console.log('current user is the owner');
		  return true;
		  }
		  else {
		  console.log('current user is not the owner');
		  return false}
	console.log('canEdit: ' + this.get('canEdit'))
	}
  else {console.log('current user has an undefined id');
  return false}
  }.property('controllers.gigs.activeGigId', App.currentUser),
  
  signedInChanged: function() {
  console.log('signedIn changed');
	  if(this.get('controllers.gigs.signedIn') ) {
			this.set('signedIn', true);
			console.log('user signed in is ' + this.get('signedIn'));
		}
		else {this.set('signedIn', false);
			console.log('user signed in is ' + this.get('signedIn'));
		};
  }.observes('controllers.gigs.signedIn'),
  
  startEditing: function() {
    var editgiginmapController = this.get('controllers.edit');
      	console.log('editgiginmapController is ' + editgiginmapController);

    editgiginmapController.set('content', this.get('content'));
    editgiginmapController.startEditing();
    this.set('isEditing', true);
  },

  stopEditing: function() {
    var editgiginmapController = this.get('controllers.edit');
    editgiginmapController.stopEditing();
    this.set('isEditing', false);
  },

  destroyRecord: function() {
    if (window.confirm("Are you sure you want to delete this Gig?")) {
      this.get('content').deleteRecord();
      this.get('store').commit();

      // return to the main gigs page
      this.get('target.router').transitionTo('root');
    }
  }
});
