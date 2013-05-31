App.EditController = Em.ObjectController.extend({
  needs: ['gig', 'currentUser'],

  startEditing: function() {
  	
    // add the gig and its associated media files to a local transaction
    var gig = this.get('content');
    var transaction = gig.get('store').transaction();
    transaction.add(gig);
    console.log('transaction is equal to ' + transaction);
    gig.get('mediaFiles').forEach(function(mediaFile) {
      transaction.add(mediaFile);
    });
    this.transaction = transaction;
  }, //this is messy, each gig now has only one phone number (each gig has only one associated details entry). Fix this, or risk optimisation problems.

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
  },

  addMediaFile: function() {
    this.get('content.mediaFiles').createRecord();
  },

  removeMediaFile: function(mediaFile) {
    mediaFile.deleteRecord();
  },
  
  toGig: function() {
	console.log('called from editView');
		this.stopEditing();
		this.get('controllers.gig').stopEditing();
	 this.transitionToRoute('gig');
	  $('.card').removeClass('flipped');
	},
  
});
