var app = app || {};

app.QuizView = Backbone.View.extend({
	el: 'body',

	events:{
		'click .startButton': 'startQuiz',
		'click .startAdmin': 'startAdmin',
		'click .restart': 'restart',
	},

	initialize: function(){
		console.log('quizView initialize');

		this.questionView = {};

		this.panel = $('.jumbotron');
		this.stats = $('.stats');
		this.bad = $('.bad');
		this.good = $('.good');
		this.messages = $('.messages');
		
		this.listenTo(this.collection, 'answerGood', this.answerGood);
		this.listenTo(this.collection, 'answerBad', this.answerBad);
		this.listenTo(this.collection, 'answerGood answerBad', this.render);

		this.collection.good = 0;
		this.collection.bad = 0;
		
	},

	render: function(){
		this.renderStats();
	},

	renderStats: function(){
		this.bad.html(this.collection.bad);
		this.good.html(this.collection.good);
	},

	renderQuestion: function(){
		//delete current question
		if(this.question)
			this.question.remove();

		//get new question
		var questionModel = this.nextQuestion();
		if(questionModel){
			this.question = new app.QuestionView({model: questionModel})
			this.panel.html(this.question.render().$el)
		}else{
			this.panel.html('GREAT!!! You have answered all questions in quiz.');
		}
	},

	nextQuestion: function(){
		return this.collection
			.chain()
			.filter(function(item){return !item.get('done');})
			.shuffle()
			.first()
			.value()
	},

	startQuiz: function(){
		console.log('Quiz started');
		this.stats.show();
		this.renderQuestion();
	},

	startAdmin: function(){
		new app.AdminView();
	},

	restart: function(){
		this.collection.good = 0;
		this.collection.bad = 0;
		this.render();
		this.collection.forEach(function(item){
			item.set('done', false);
		});
		this.renderQuestion();
	},

	answerGood: function(){
		this.collection.good++;
		this.renderQuestion();
		$(".correct").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	},

	answerBad: function(){
		this.collection.bad++;
		this.renderQuestion();
		$(".mistakes").fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
	},

});