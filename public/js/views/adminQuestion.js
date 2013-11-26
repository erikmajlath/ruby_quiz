var app = app || {}

app.AdminQuestionView = Backbone.View.extend({

	events:{
		'click .questionHeader': 'toggle',
		'click .removeQuestion': 'removeQuestion',
		'click .addAnswer': 'addAnswer',
		'blur .questionText': 'changeText',
	},

	initialize: function(){
		console.log('AdminQuestionView - initialize()');

		this.template = $('#admin_question_template').html();
		this.listenTo(this.model.get('answers'), 'change add remove', this.push);
		this.listenTo(this.model, 'change', this.push);
		this.listenTo(this.model, 'destroy', this.remove);
	},

	push: function(e){
		console.log(e);
		this.model.save();
	},

	render: function(){
		console.log('AdminQuestionView - render()');	

		var data = this.model.toJSON();
		data.headerQuestion = data.question.substr(0,60)+' ...';
		this.$el.html(Mustache.render(this.template, data));
		this.answers = this.$('.answers');
		this.model.get('answers').forEach(function(item){
			var view = new app.AdminAnswerView({model: item});
			this.answers.append(view.render().$el);
		},this);

		return this;
	},

	toggle: function(){
		this.$('.questionBody').toggle();
		this.$('.toggle').toggleClass('glyphicon-resize-full').toggleClass('glyphicon-resize-small');
	},

	removeQuestion: function(){
		this.model.destroy();
	},

	changeText: function(e){
		this.model.set('question', e.currentTarget.value);
	},

	addAnswer: function(){
		var answer =  new app.Answer();
		this.model.get('answers').add(answer);
		var view = new app.AdminAnswerView({model: answer});
		this.answers.append(view.render().$el);
	},
});

app.AdminAnswerView = Backbone.View.extend({

	events:{
		'click .correct': 'toggleCorrect',
		'blur .answerText': 'changeAnswer',
		'click .removeAnswer': 'deleteAnswer',
	},

	initialize: function(){
		console.log('AdminAnswerView - initialize()');

		this.template = $('#admin_answer_template').html();
		this.listenTo(this.model, 'destroy', this.remove);
	},

	render: function(){
		console.log('AdminAnswerView - render()');	
		var data = this.model.toJSON();
		this.$el.html(Mustache.render(this.template, data));
		return this;

	},

	toggleCorrect: function(e){
		this.model.set('correct', e.currentTarget.checked);
	},

	changeAnswer: function(e){
		this.model.set('answer', e.currentTarget.value);
	},

	deleteAnswer: function(e){
		this.model.destroy();
	},
});