App.FilterView = Em.View.extend({

init: function() {
this._super();
	var allContent = App.Gig.find();
	console.log('allContent = ' + allContent);	
	this.set('content', allContent);
	console.log('the filterviews content is now ' + this.content)
},


didInsertElement: function() {

	var view = this;
	console.log('the views content is now ' + view.content + ' using this');
	
	$(function() {
    var cache = {};
    $( "#search" ).autocomplete({
      minLength: 3,
      delay: 500,
      source: function( request, response ) {
        var term = request.term;
        if ( term in cache ) {
          response( cache[ term ] );
          return;
        }
 
        $.getJSON( "/gigs", { name: request.term }, function( data, status, xhr ) {
          cache[ term ] = data;
          response( data );
        });
      }
    });
  });
	
	
	console.log('the autocompletes source is ' + this.content + '.');
	
}

});