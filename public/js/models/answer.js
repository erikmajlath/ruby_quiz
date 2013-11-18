var app = app || {}

app.Answer = Backbone.Model.extend({
	defaults:{
		checked: false,
		correct: false,
	},
});

app.Answers = Backbone.Collection.extend({
	model: app.Answer,
})