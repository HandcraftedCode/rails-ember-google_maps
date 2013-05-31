App.GigsNewView = Ember.View.extend({
controller: 'App.GigsNewController',
  didInsertElement: function() {
    	console.log('the models user id is now ' + this.get('user_id'));
    	this.controller.send('startEditing');
	},
	
 
});
