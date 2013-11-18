var app = app || {}

app.QuestionView = Backbone.View.extend({

	events: {
		'click .btn': 'submit',
	},

	initialize: function(){
		console.log('QuestionView initialize');

		this.template = Mustache.compile($('#question_template').html());
	},

	render: function(){
		console.log('QuestionView render');

		this.$el.html(this.template(this.model.toJSON()));
		var child = new app.AnswersView({collection: this.model.get('answers')});
		this.$('.answers').html(child.render().$el);
		return this;
	},

	submit: function(){
		var res = this.model.get('answers')
			.every(function(item){
				return item.get('checked') == item.get('correct');
			})

		this.model.get('answers').each(function(item){
			item.set('checked', false);
		})

		this.model.set('done', res);
		e = res? 'answerGood':'answerBad';
		this.model.trigger(e);
	},
}); 