App.GigView = Em.View.extend({
  content: null,
  didInsertElement: function() {
  $('.flip').fadeIn();
	  console.log('the gigviews controller is ' + this.get('controller'));
	  this.set('content', this.get('controller.content'));
	  console.log('the content of the gigview is ' + this.get('content'));
	  //turn .banner in to an unslider
	  $(function() {
		  $('.banner').unslider({
			  speed: 500,               //  The speed to animate each slide (in milliseconds)
			  delay: 3000,              //  The delay between slide animations (in milliseconds)
			  complete: function() {},  //  A function that gets called after every slide animation
			  keys: false,               //  Disable keyboard (left, right) arrow shortcuts
			  dots: false,               //  Do not display dot navigation
			  fluid: true              //  Support responsive design. May break non-responsive designs
		  });
	});
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