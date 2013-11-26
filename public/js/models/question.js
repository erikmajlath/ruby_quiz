var app = app || {}

app.Question = Backbone.Model.extend({

	idAttribute: '_id',

	initialize: function(data){
		var answersData = data.answers;

		//throw away useless data from server
		this.set('answers', new app.Answers(answersData));
		this.set('done', false);
	},
});