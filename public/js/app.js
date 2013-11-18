var app = app || {}

$(document).ready(function(){
	console.log('Application initialized');

	app.dev = {}

	app.dev.col = new app.Quiz();
	app.dev.quizView = new app.QuizView({collection: app.dev.col});

	app.resetData();

});