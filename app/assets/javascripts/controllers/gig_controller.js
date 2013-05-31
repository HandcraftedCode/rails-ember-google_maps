App.GigController = Em.ObjectController.extend({
init: function() {
	  console.log('In the GigController !');
	  this.signedInChanged();
	  console.log('the content of the Gigcontroller is now ' + this.get('content'));
	  console.log('the current gigs id is ' + this.get('content.id'));
	  console.log('current users id from the gigController is ' + this.get('controllers.gigs.controllers.currentUser.content.id')) 
  },
  
  isEditing: false,
  needs: ['gigs', 'edit', 'currentUser'],
signedIn: null,
  currentUserIsEditor: function() {
  console.log('checking if current user is editor');
  if(this.get('controllers.currentUser.content.id') !== undefined) {
  	console.log('current user is a user');
  	console.log('the id of the gig is ' + this.get('content.user_id') + ' and the id of the user is ' + this.get('controllers.currentUser.content.id'));
	  if(this.get('content.user_id') === this.get('controllers.currentUser.content.id'))
		  {console.log('current user is the owner');
		  return true}
		  else {
		  console.log('current user is not the owner');
		  return false}
	}
  else {console.log('current user has an undefined id');
  return false}
  }.observes('content'),
  
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
