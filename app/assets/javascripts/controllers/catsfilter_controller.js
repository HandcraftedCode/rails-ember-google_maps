App.CatsfilterController = Ember.Controller.extend({
	
	init: function() {
		this._super();
		this.set('content', this.controllers.gigs.content);
		console.log('catsfiltercontroller content is now ' + this.content + '*************!!!!!!*********');
	},
	needs: ['gigs']
});