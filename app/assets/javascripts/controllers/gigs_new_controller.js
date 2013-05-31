App.GigsNewController = Em.ObjectController.extend({
needs: ['gigs', 'filter', 'selector', 'index', 'currentUser', 'users'],
currentUser: null,
init: function() {
	this.set('currentUser', this.get('controllers.currentUser.content'));
	console.log('the current user is ' + this.get('currentUser'));
	this.startEditing();
	console.log('the content of the GigsNewController is now ' + this.content);
	if($.cookie('tharGig')) {
	console.log('the previous content of the GigsNewController was ' + $.cookie('tharGig'));}
},

clearForm: function() {
	this.stopEditing();
	 this.set('content', this.transaction.createRecord(App.Gig, {}));
    if(this.get('currentUser.id')) {
    	//if theres a user logged in, set the model user_id to the current user_id
	    this.set('content.user_id', this.get('currentUser.id'));
	    console.log('the user_id property for the new gig is ' + this.get('content.user_id'));
    }
    else {
	    //set the id to a default value for periodic checking and saving on the server
	    this.set('content.user_id', 'pending');
	    console.log('the user_id property for the new gig is ' + this.get('content.user_id'));
    };
},


  startEditing: function() {
  console.log('startEditing called');
  //wipe out the old JSON object
  var z = null;

    // create a new record on a local transaction
    this.transaction = this.get('store').transaction();
    
   // check for existence of previous Gig
   
   	var zx = $.cookie('tharGig')
    try {var z = JSON.parse(zx);}
    catch (err)
    	{
	    	console.log('the cookie is undefined')
	    	var z = null;
    	};
    console.log('z is ' + z);
    if(z !== null) {
    //if it exists, set its properties to the current model and commit the transaction with the new user_id
    
    var that = this;
		this.set('content', this.transaction.createRecord(App.Gig, {
			//the key/value pairs from the Session store.
			name: z.name,
			notes: z.notes,
			lat: z.lat,
			lng: z.lng,
			external_url: z.external_url,
			start: z.start,
			end: z.end,
			ticket_url: z.ticket_url,
			cat1: z.cat1,
			cat2: z.cat2,
			pricelower: z.pricelower,
			pricehigher: z.pricehigher,
			user_id: that.get('currentUser.id')
			
		}));
		console.log('the content of the GigsNewController has been updated to include the previous Gig, so its now ' + JSON.stringify(this.get('content').getProperties('name', 'notes', 'lat', 'lng', 'external_url', 'start', 'end', 'ticket_url', 'cat1', 'cat2', 'pricelower', 'pricehigher', 'user_id')));
		//save the transaction, which will call transitionAfterSave.
		this.save();
		//empty the cookie
		$.cookie('tharGig', null);
		console.log('cookie emptied');
	}
	else {
	//if it doesn't exist, create a new, blank record for the user to start editing.
    
    this.set('content', this.transaction.createRecord(App.Gig, {}));
    if(this.get('currentUser.id')) {
    	//if theres a user logged in, set the model user_id to the current user_id
	    this.set('content.user_id', this.get('currentUser.id'));
	    console.log('the user_id property for the new gig is ' + this.get('content.user_id'));
    }
    else {
	    //set the id to a default value for periodic checking and saving on the server
	    this.set('content.user_id', 'pending');
	    console.log('the user_id property for the new gig is ' + this.get('content.user_id'));
    };
    console.log('no previous cookie gig, so a blank one instead. Content is ' + this.get('content'));
  }},
controlla: this,
  stopEditing: function() {
  console.log('stopEditing called');
    // rollback the local transaction if it hasn't already been cleared
    if (this.transaction) {
      this.transaction.rollback();
      this.transaction = null;
    }
  },

  save: function() {
    // commit and then clear the local transaction
    this.transaction.commit();
    this.transaction = null;
  },

  transitionAfterSave: function() {
    // when creating new records, it's necessary to wait for the record to be assigned
    // an id before we can transition to its route (which depends on its id)
    if (this.get('content.id')) {
      this.transitionToRoute('gig', this.get('content'));
    }
  }.observes('content.id'),

  cancel: function() {
  	$.cookie('tharGig', null);
    this.stopEditing();
    this.transitionToRoute('gigs.index');
  },

  addMediaFile: function(sauce) {
  	var that = this;
    this.get('content.mediaFiles').createRecord({
	    gig_id: that.get('content.id'),
	    src: sauce
    })
    },

  removeMediaFile: function(mediaFile) {
    mediaFile.deleteRecord();
  },
  theGig: null,
  
  doAuth: function() {
  console.log('this is ' + this);
  console.log(this.get('lat'));
  console.log(this.get('lng'));
  	if((this.get('lat') !== undefined) || (this.get('lng') !== undefined))
  		{this.set('theGig', this.content);
  		var theGigHash = this.get('content').getProperties('name', 'notes', 'lat', 'lng', 'external_url', 'start', 'end', 'ticket_url', 'cat1', 'cat2', 'pricelower', 'pricehigher');
  		var theGigHashString = JSON.stringify(theGigHash);
  		console.log('theGig is ' + this.get('theGig'));
  		console.log('theGigHash is ' + theGigHash);
  		console.log('theGigHashString is ' + theGigHashString);
  		var that = this;
  		$.cookie("tharGig", theGigHashString);
  		console.log('the cookie set is now ' + JSON.parse($.cookie("tharGig")));
		}
  	function checkForUser(e) {
  		if(e !== "") {
	  		var requestUrl = '/users/' + e;
	  		var that = this;
	    	$.ajax({url: requestUrl,
	    		dataType: 'json',
	    		statusCode: {
		    		404: function() {
			    		console.log('no user found with response = 404, fading in sign-up form');
					    $('#loginForm').fadeOut();
					    $('#signUpForm').fadeIn();
					    $('#signUpEmailField').val(e)
			    		}
			    	},
		    	success: function(data) {
				    	console.log('found user with email ' + e);
				    	$('#signUpForm').fadeOut();
				    	$('#loginForm').fadeIn();
						$('#loginEmailField').val(e);
						
					},	
			    error:  function(xhr) {
			    		console.log('there was an error');
					},
				    
			    })
		    	}
		    
		else {
			alert('You have to enter an e-mail first.')
		}
    };
  	var protoEmail = $('input#email').val();
  	checkForUser(protoEmail);	  
	  
  },
  isExpanded: false,

  expand: function() {
    this.set('isExpanded', true);
  },

  contract: function() {
    this.set('isExpanded', false);
  }
  
});
