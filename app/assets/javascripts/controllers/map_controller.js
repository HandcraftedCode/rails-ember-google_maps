App.MapController = Ember.ArrayController.extend({
	needs: ["gigs", 'gigs.new', 'gig'],
	
	vContentChange: function() {
		this.set('content', this.get('controllers.gigs.content'));
		console.log('the content of the mapcontroller changed and is now ' + this.get('content'))
	}.observes('controllers.gigs.content'),
  gigsBinding: "controllers.gigs",
  
markerArray:null,
  init: function() {
    this._super();
    this.set("markerArray", []); // markerArray cleaned on load

    this.set('content', this.get('controllers.gigs.content')); //content set from gigscontroller, which is kept up-to-date with filters and whatnot.
    
  },
  extractMarker: function(obj) {
  var that = this;
  
        console.log('obj from which marker is being extracted is ' + obj);
	  var lat = obj.get('lat'),
	  	  lng = obj.get('lng'),
	  	  name = obj.get('name'),
	  	  id = obj.get('id'),
	  	  displayStyle = 'block',
	  	  iwContent = '<div class="infoWindowContent" data-name="infoWindow-' + obj.get('name') + '">' + obj.get('name') + '<br>' + obj.get('cat1') + '<br><a href="#/gigs/' + id + '" class="seeMore" id="seeMoreId" data-gigName="' + name + '" onclick="displayModal()">See More</a></div>', //later this will be the HTML template thing
	  	  
	  	  map = this.get('map'); //end variable assignment
	  	  //make the gigModal fade in on click
	  	 
	  var latLng = new google.maps.LatLng(lat, lng);
	  var marker = new google.maps.Marker({
	  		position: latLng,
	  		map: map,
	  		title: name,
	  		id: id,
	  		
  		});
  		google.maps.event.addListener(marker, 'click', function () {
	  		infowindow.setContent(iwContent);
	  		infowindow.open(map, marker);
	  		//document.getElementById('seeMoreId').addEventListener('click', that.loadGigWindow(id), false)
	  		});	
	  		google.maps.event.addListener(marker, 'dblclick', function(event) {
            
          });
  		console.log('A marker was created!');
  		this.get('markerArray').push(marker);
  		
  		
  },
  
loadGigWindow: function(gigId) {
	
  		if(gigId !== "") {
  			var theThing = App.Gig.find(gigId);
  			this.set('controllers.gig.content', theThing);
  			console.log('the gig controllers content is ' + this.get('controllers.gig.content'));
  			console.log('theThing is ' + theThing + ' with a name of ' + theThing.get('name'));
	  		/* OLD AJAX CODE, no longer necessary to go through Rails
	  		var requestUrl2 = '/gigs/' + gigId;
	  		var thatOne = this;
	    	
$.ajax({url: requestUrl2,
	    		dataType: "json",
		    	success: function(data) {
				    	console.log('loading iContent for gig with an id of ' + gigId);
				    	 
				    	console.log('data is ' + data.gig);
				    	var theObject = Ember.Object.create(data.gig);
				    	console.log('theObject is ' + theObject);
				    	
				    	
				    	thatOne.set('controllers.gig.content', theObject);
				    	console.log('the content of the gig overlay is now ' + thatOne.get('controllers.gig.content') + ' with an id of ' + thatOne.get('controllers.gig.content.id'));
						
					},	
			    error:  function(xhr) {
			    		var errors = $.parseJSON(xhr.responseText)
					    console.log('no gig found with response = ' + errors);
					    
					},
				    
			    })
*/
		    	}
		    
		else {
			alert('The gig you clicked on has no ID, for some reason.')
		}

},

teardownMarkerArray: function() {
	var controller = this;
   		
   		var markersArray = controller.get('markerArray');
     if (markersArray) {
        for (i=0; i < markersArray.length; i++) {
            markersArray[i].setMap(null);
        }
    markersArray.length = 0;
    };  

},

  pushOn: function(incoming) {
	  this.markerArray.push(incoming)
  },
   makeMarkers: function() {
   this.teardownMarkerArray();
   var controller = this;
   			  Ember.run.later(controller, function() {
	  this.makeMarkersNow()}, 300);
  },

 /*
didLoad: function() {
  this.makeMarkers();},
  displayMarkerArray: function() {
	   console.log('the markerArray now contains ' + this.markerArray + '.')
   },
*/
   reRenderMap: function () {
        if (this.get('map')) {
            var newLoc = new google.maps.LatLng(this.get('lat'), this.get('lng'));
            this.get('map').set('center', newLoc);
            }
            
            
        }.observes('lat', 'lng'),
        
         /*
        >--------------------------------------<
        
        Here is the updateMarkers function.
        It iterates through the controller's content,
        which is an array of objects. It then pushes
        each object in to a markerArray and updates
        the user as to what it's doing.
        
        Later, this will be updated to iterate through
        the filteredContent, and therefore only create
        relevant markers. Since each marker is an object
        in the browser, trimming them down in this way
        is the most efficient thing to do at this juncture.
        
        
        >--------------------------------------<
        */        
         updateMarkersNow: function() {
  console.log('controller received updateMarkersNow request');

  console.log('markerArray now contains ' + this.get('markerArray'))
  var contentNow = this.content; //will be filteredContent, as a computed variable from the filters. That way only the most relevant markers are ever presented in the markerArray, meaning the markerArray (which is held in memory in the view) is only ever kept quite small. Instead, the content is held entirely in the model (the DS.Store), but  the controller will fetch them from the store based on a selection procedure determined from the filter options applied by the user.
  var controller = this;
  console.log('the content is now ' + contentNow + '.');
  contentNow.forEach(function(item) {
  console.log('item immediately equal to ' + item);
  controller.get('markerArray').push(item);
   console.log('markerArray now contains ' + controller.markerArray);
  });},
        
        makeMarkersNow: function() {
  console.log('controller received makeMarkersNow request');
  
  console.log('markerArray now contains ' + this.markerArray)
  var contentNow = this.content;
  var controller = this;
  console.log('the content of the mapcontroller is now ' + contentNow + '.');
  contentNow.forEach(function(item) {
  controller.extractMarker(item);
   console.log('markerArray now contains ' + controller.get('markerArray'));
  });
	  },
	  
	  iWCommand: function() {
	  console.log('iWCommand called');
	  var el = $('#seeMoreId');
	  console.log(el);
	  var gigName = el.attr('data-gigName');
	  var theGig = App.Gig.find({name: gigName});
	  console.log(theGig);
	  el.attr('href', '/gigs/' + theGig.get('id'))
	  console.log('els href is now ' + el.attr('href'))
  }
	  	
});