App.Uploader = Em.View.extend({
	templateName: 'uploader',
	submit: function(event) {
		 
			 console.log('uploader called');
			 $('#uploaderForm').submit(function() {
			 return false;
			 console.log('upload submitted');
		})
	},
	didInsertElement: function() {
		
		$('#fileUpload').change(function() {
			// from an input element
		var filesToUpload = document.getElementById('fileUpload').files;
		var file = filesToUpload[0];
		var canvas = document.getElementById('mediaPreview');
		var img = document.createElement("img");
		var reader = new FileReader();  
		reader.onload = function(e) {img.src = e.target.result}
		reader.readAsDataURL(file);
		
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);
		
		var MAX_WIDTH = 1000;
		var MAX_HEIGHT = 1000;
		var width = img.width;
		var height = img.height;
		
		if (width > height) {
		  if (width > MAX_WIDTH) {
		    height *= MAX_WIDTH / width;
		    width = MAX_WIDTH;
		  }
		} else {
		  if (height > MAX_HEIGHT) {
		    width *= MAX_HEIGHT / height;
		    height = MAX_HEIGHT;
		  }
		}
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, width, height);
		
		var dataurl = canvas.toDataURL("image/png");
		console.log(dataurl);
		//Post dataurl to the server with AJAX
		})
	}
	
});