// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap

//= require jquery.ui.all

// *** Heroku can't find these from the ember-rails gem
// *** Edit below require statements and remove vendor files when this fixed
//= require vendor/handlebars-rc3
//= require vendor/ember-1.0.0-rc.1
//= require vendor/ember-data

//= require_self
//= require ember_app
//= require_tree .

App = Ember.Application.create();

//set up resrc asynchronously (http://www.resrc.it/docs/)
  var config = {
    locale: "uk",
    bandwidthDetect: true,
    resrcOnLoad: true,
    resrcOnResize: true,
    resrcOnPinch: true,
    resrcOnDoubleTap: true
  }
  var c=!1,a=document.createElement("script");a.src="//www.resrc.it/resrc.js";a.type="text/javascript";a.async="true";a.onload=a.onreadystatechange=function(){var a=this.readyState;if(!(c||a&&"complete"!=a&&"loaded"!=a)){c=!0;try{resrc.load(config)}catch(b){}}};var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b);

// Put jQuery UI inside its own namespace
JQ = Ember.Namespace.create();

// Create a new mixin for jQuery UI widgets using the Ember
// mixin syntax.
JQ.Widget = Em.Mixin.create({
  // When Ember creates the view's DOM element, it will call this
  // method.
  didInsertElement: function() {
    // Make jQuery UI options available as Ember properties
    var options = this._gatherOptions();

    // Make sure that jQuery UI events trigger methods on this view.
    this._gatherEvents(options);

    // Create a new instance of the jQuery UI widget based on its `uiType`
    // and the current element.
    var ui = jQuery.ui[this.get('uiType')](options, this.get('element'));

    // Save off the instance of the jQuery UI widget as the `ui` property
    // on this Ember view.
    this.set('ui', ui);
  },

  // When Ember tears down the view's DOM element, it will call
  // this method.
  willDestroyElement: function() {
    var ui = this.get('ui');

    if (ui) {
      // Tear down any observers that were created to make jQuery UI
      // options available as Ember properties.
      var observers = this._observers;
      for (var prop in observers) {
        if (observers.hasOwnProperty(prop)) {
          this.removeObserver(prop, observers[prop]);
        }
      }
      ui._destroy();
    }
  },

  // Each jQuery UI widget has a series of options that can be configured.
  // For instance, to disable a button, you call
  // `button.options('disabled', true)` in jQuery UI. To make this compatible
  // with Ember bindings, any time the Ember property for a
  // given jQuery UI option changes, we update the jQuery UI widget.
  _gatherOptions: function() {
    var uiOptions = this.get('uiOptions'), options = {};

    // The view can specify a list of jQuery UI options that should be treated
    // as Ember properties.
    uiOptions.forEach(function(key) {
      options[key] = this.get(key);

      // Set up an observer on the Ember property. When it changes,
      // call jQuery UI's `option` method to reflect the property onto
      // the jQuery UI widget.
      var observer = function() {
        var value = this.get(key);
        this.get('ui').option(key, value);
      };

      this.addObserver(key, observer);

      // Insert the observer in a Hash so we can remove it later.
      this._observers = this._observers || {};
      this._observers[key] = observer;
    }, this);

    return options;
  },

  // Each jQuery UI widget has a number of custom events that they can
  // trigger. For instance, the progressbar widget triggers a `complete`
  // event when the progress bar finishes. Make these events behave like
  // normal Ember events. For instance, a subclass of JQ.ProgressBarView
  // could implement the `complete` method to be notified when the jQuery
  // UI widget triggered the event.
  _gatherEvents: function(options) {
    var uiEvents = this.get('uiEvents') || [], self = this;

    uiEvents.forEach(function(event) {
      var callback = self[event];

      if (callback) {
        // You can register a handler for a jQuery UI event by passing
        // it in along with the creation options. Update the options hash
        // to include any event callbacks.
        options[event] = function(event, ui) { callback.call(self, event, ui); };
      }
    });
  }
});
