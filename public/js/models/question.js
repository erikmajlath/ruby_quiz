var app = app || {}

app.Question = Backbone.Model.extend({
	defaults:{
		done: false,
	},

	idAttribute: '_id',

	initialize: function(data){
		var answersData = data.answers;
		this.set('answers', new app.Answers(answersData));
	},
});