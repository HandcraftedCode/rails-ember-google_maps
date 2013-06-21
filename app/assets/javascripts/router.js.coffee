## In a real app you will probably want to separate components into different files
## They are grouped together here for ease of exposition

App.Router.map ->
	@route "home"
	@route "about"
	@resource "gigs",
		path: "/gigs"
	, ->
		@route "login"
		@route "registration"
		@resource "gig",
			path: "/:gig_id"
		, ->
			@route "edit"


App.IndexRoute = Ember.Route.extend
  redirect: -> @transitionTo 'gigs'


App.GigsLoginRoute = Ember.Route.extend
  model: -> Ember.Object.create()
  renderTemplate: ->
    @render "login",
      outlet: "auth"
  setupController: (controller, model) ->
    controller.set "errorMsg", ""
    $("#authWindow").fadeIn()
  events:
    cancel: ->
      log.info "cancelling login"
      $("#authWindow").fadeOut()
      @transitionTo 'gigs'
    login: ->
      log.info "Logging in..."
      App.login this
      $("#authWindow").fadeOut()



App.GigsRegistrationRoute = Ember.Route.extend
  model: -> Ember.Object.create()
  renderTemplate: ->
    @render "registration",
      outlet: "auth"
  setupController: (controller, model) ->
  	$("#authWindow").fadeIn()
  events:
    register: ->
      log.info "Registering..."
      App.register this
      $("#authWindow").fadeOut()
    cancel: ->
      log.info "cancelling registration"
      $("#authWindow").fadeOut()
      @transitionTo 'gigs'
