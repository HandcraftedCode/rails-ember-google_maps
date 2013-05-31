App.PreviewUploadImage = Ember.View.extend({
	didInsertElement: function() {
		console.log('the previewUploadImageViews content is ' + this.content);
	},
    fileField: Ember.TextField.extend({
        type: 'file',
        attributeBindings: ['name'],
        change: function(evt) {
            var input = evt.target;
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                var that = this;
                reader.onload = function(e) {
                    //that.$().parent(':eq(0)').children('img:eq(0)').attr('src', e.target.result);
                    var view = that.get('parentView.previewImageView');
                    view.printme();
                    
                    that.set('parentView.content.img_src', e.target.result);
/* since there is a two-way binding with the img src
                    and the model, an update to one should be reflected
                    in the other.  However, this doesn't seem to be the case
My guess is because I am not using the ember.js wrapper functions to update
                    the src attribute.
                    */
                    console.log("Img src [" + that.get('parentView.content.img_src') + "]");
                    that.get('controller').send('addMediaFile', e.target.result);
                    var mediaFilesArray = that.get('controller.content.mediaFiles');
                    console.log('mediaFilesArray is ' + mediaFilesArray);
                    var lastMediaFile = mediaFilesArray.get('lastObject');
                    console.log('lastObject of mediaFilesArray is ' + mediaFilesArray.get('lastObject'));
                    var lastMediaFileSrc = mediaFilesArray.get('lastObject.src');
                    
                    console.log('lastMediaFiles Src is ' + lastMediaFileSrc);
                    
                    that.set('controller.content.mediaFiles.lastObject.src', e.target.result);
                    
                    console.log('lastMediaFiles Src is ' + mediaFilesArray.get('lastObject.src'));
                    console.log('lastMediaFiles Src on the model is ' + that.get('controller.content.mediaFiles.lastObject.src'));
                    //App.myModel.set('myModel_src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        },
        printme: function() {
            console.log("In FilField view\n");
        },
    }),

    previewImageView: Ember.View.extend({
        attributeBindings: ['name', 'width', 'height', 'src'],
        tagName: 'img',
        viewName: 'previewImageView',
        printme: function() {
            console.log('in previewImageView');
        },
    }),
});