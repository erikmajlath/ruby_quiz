var app = app || {}

app.Quiz = Backbone.Collection.extend({
	model: app.Question,
	url: '/quiz',
});