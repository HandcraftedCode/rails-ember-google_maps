App.GigsNewController = Em.ObjectController.extend({
needs: ['gigs', 'filter', 'selector', 'index', 'currentUser', 'users'],
currentUser: null,
controlla: this,
init: function() {
	this.set('currentUser', App.currentUser);
	console.log('the current user is ' + this.get('currentUser'));
	this.startEditing();
	console.log('the content of the GigsNewController is now ' + this.content);
	if($.cookie('tharGig')) {
	console.log('the previous content of the GigsNewController was ' + $.cookie('tharGig'));}
	POLICY_JSON = { "expiration": "2020-12-01T12:00:00.000Z",
	            "conditions": [
	            {"bucket": "gigggs"},
	            ["starts-with", "$key", "events/"],
	            {"acl": "public-read"},                           
	            ["starts-with", "$Content-Type", ""],
	            ["content-length-range", 0, 524288000]
	            ]
	          };
	
	
	    var secret = App.s3Secret;
	    var policyBase64 = Base64.encode(JSON.stringify(POLICY_JSON));
	    console.log ( policyBase64 )
	
	    var sig = b64_hmac_sha1(secret, policyBase64);
	    var signature = sig + "=";
	    console.log(signature);
	   this.set('signature', signature);
	   this.set('policy64', policyBase64);

},

authStateBinding: Ember.Binding.oneWay('App.LoginStateManager.currentState'),
  authState: null,
  authenticated: (function() {
    log.info("GigsNewController authent");
    this.setGigId();
    return this.get("authState") === App.LoginStateManager.authenticated;
  }).property("authState"),

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
    
/* COOKIE STUFF FOLLOWS, perhaps not necessary in an SPA.
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
			user_id: App.currentUser.id
			
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
*/
    
    this.set('content', this.transaction.createRecord(App.Gig, {}));
    console.log('no previous cookie gig, so a blank one instead. Content is ' + this.get('content'));
    this.setGigId();
  },
  setGigId: function() {
	  if(App.currentUser) {
    	//if theres a user logged in, set the model user_id to the current user_id
	    this.set('content.user_id', App.currentUser.id);
	    console.log('the user_id property for the new gig is ' + this.get('content.user_id'));
    }
    else {
	    //set the id to a default value for periodic checking and saving on the server
	    this.set('content.user_id', 'pending');
	    console.log('the user_id property for the new gig is ' + this.get('content.user_id'));
    };
  }.observes(App.currentUser),
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
    this.transitionToRoute('gigs');
  },

  addMediaFile: function() {
  	var that = this;
    this.get('content.attachments').createRecord({
    })
    },

  removeMediaFile: function(attachment) {
    attachment.deleteRecord();
  },
  theGig: null,
  
  doAuth: function() {
  var controlling = this;
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
		    		422: function() {
			    		console.log('no user found with response = 422, transitioning to registration route');
					    controlling.transitionToRoute('gigs.registration');
					    $('#emailLogIn').val(e);
			    		}
			    	},
		    	success: function(data) {
				    	console.log('found user with email ' + e);
				    	controlling.transitionToRoute('gigs.login');
						$('#Registeremail').val(e);
						
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
  },
  
  signature: null,
	policy64: null,
	curKey: null,
	curType: null,

	attach: function(sauce, type, gig) {
		console.log('sauce is ' + sauce + ', type is ' + type + ' and gig is ' + gig);
		var attachment = this.get('content.attachments').createRecord(App.Attachment, {
			src: sauce,
			format: type,
			gigId: gig
		});
		
		return attachment;
	},
	
	uploadFile: function() {
	

    var file = document.getElementById('file').files[0];
    var filetype = getFileExtension(file.name);
    console.log('name of file is ' + file.name);
    console.log('filetype is ' + filetype);
    this.set('curType', filetype);
    
    var fd = new FormData();
    var key;
    if(this.currentUser) {
    	key = "events/" + (new Date).getTime() + '&userid=' + this.currentUser.id + '&guid=' + generateGUID();
    } else {
	  	key = "events/" + (new Date).getTime() + "&userid=null" + '&guid=' + generateGUID();
    };
    this.set('curKey', key);
    
    
    
    console.log('curKey is ' + this.get('curKey'));
    var sig = this.get('signature');
    console.log(sig);
    fd.append('key', key);
    fd.append('acl', 'public-read'); 
    fd.append('Content-Type', file.type);      
    fd.append('AWSAccessKeyId', 'AKIAJH774J5VMJRDKWDA');
    fd.append('policy', this.get('policy64'))
    fd.append('signature', this.get('signature'));

    fd.append("file",file);
    
    var xhr;
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xhr=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xhr=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		  
		  var controlla = this;

    xhr.upload.addEventListener("progress", this.uploadProgress, false);
    xhr.addEventListener("load", function(evt) {
    	console.log(controlla);
	    controlla.get('content.attachments').createRecord({
		    src: 'https://s3.amazonaws.com/gigggs/' + controlla.curKey,
		    format: controlla.curType,
		    gig: controlla.content.id
	    });
	    /*console.log('src of attachmentsFile is ' + attachmentsFile.get('src'));
	    console.log('format of attachmentsFile is ' + attachmentsFile.get('format'));
	    console.log('gigId of attachmentsFile is ' + attachmentsFile.get('gigId'));*/
	    console.log('current attachments files are ' + controlla.get('content.attachments'));
	    
    }, false);
    xhr.addEventListener("error", this.uploadFailed, false);
    xhr.addEventListener("abort", this.uploadCanceled, false);

    xhr.open('POST', 'https://gigggs.s3.amazonaws.com/', true); //MUST BE LAST LINE BEFORE YOU SEND 

    xhr.send(fd);
  },
  
  uploadProgress: function(evt) {
    if (evt.lengthComputable) {
      var percentComplete = Math.round(evt.loaded * 100 / evt.total);
      document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
    }
    else {
      document.getElementById('progressNumber').innerHTML = 'unable to compute';
    }
  },

  uploadComplete: function(evt) {
  
    /* This event is raised when the server sends back a response, although this is being handled in the uploadFile function for now. */
    
  },

  uploadFailed: function(evt) {
    alert("There was an error attempting to upload the file." + evt);
  },

  uploadCanceled: function(evt) {
    alert("The upload has been canceled by the user or the browser dropped the connection.");
  }

  
});
