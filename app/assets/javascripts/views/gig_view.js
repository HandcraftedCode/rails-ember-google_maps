App.GigView = Em.View.extend({
  content: null,
  didInsertElement: function() {
  $('.flip').fadeIn();
	  console.log('the gigviews controller is ' + this.get('controller'));
	  this.set('content', this.get('controller.content'));
	  console.log('the content of the gigview is ' + this.get('content'));
  },
   toEdit: function() {
	 this.get('controller').startEditing();
	 this.get('controller').transitionToRoute('gig.edit');
	  $('.card').addClass('flipped');
},
toClose: function() {
	 
	 this.get('controller').transitionToRoute('gigs');
	  $('.flip').fadeOut();
},
 
});