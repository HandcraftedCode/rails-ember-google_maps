App.GigEditView = Ember.View.extend({
	templateName: 'edit',
	init: function() {
		console.log('gigeditview initialized with templateName of ' + this.templateName)
	},
	didInsertElement: function() {
		console.log('gigeditview rendered with templateName of ' + this.templateName)
	}
});
