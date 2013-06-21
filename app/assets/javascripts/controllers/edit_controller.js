App.EditController = Em.ObjectController.extend({
  needs: ['gig', 'currentUser'],

  startEditing: function() {
  	
    // add the gig and its associated attachments files to a local transaction
    var gig = this.get('content');
    var transaction = gig.get('store').transaction();
    transaction.add(gig);
    console.log('transaction is equal to ' + transaction);
    gig.get('attachments').forEach(function(attachment) {
      transaction.add(attachment);
    });
    this.transaction = transaction;
  }, //this is messy, each gig now has only one attachment (each gig has only one associated details entry). Fix this, or risk optimisation problems.

  stopEditing: function() {
    // rollback the local transaction if it hasn't already been cleared
    var transaction = this.transaction;
    if (transaction) {
      transaction.rollback();
      this.transaction = undefined;
    }
  },

  save: function() {
    this.transaction.commit();
    this.transaction = undefined;
    this.get('controllers.gig').stopEditing();
  },

  cancel: function() {
    this.get('controllers.gig').stopEditing();
    this.transitionToRoute('gig');
    $('.card').removeClass('flipped');
  },

  addMediaFile: function() {
    this.get('content.attachments').createRecord();
  },

  removeMediaFile: function(attachment) {
    attachment.deleteRecord();
  },
  
  toGig: function() {
	console.log('called from editView');
		this.stopEditing();
		this.get('controllers.gig').stopEditing();
	 this.transitionToRoute('gig');
	  $('.card').removeClass('flipped');
	},
  
});
