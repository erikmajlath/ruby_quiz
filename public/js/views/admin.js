var app = app || {};

app.AdminView = Backbone.View.extend({

	events: {
		'click .close': 'closeModal',
		'click .addQuestion': 'addQuestion',
	},

	initialize: function(){
		this.template = $('#admin_template').html();

		this.listenTo(app.dev.col, 'add', this.addOne);

		this.children = _([]);
		this.render();
	},

	render: function(){
		data = {};
		this.$el.html(Mustache.render(this.template, data));
		$('body').prepend(this.$el);

		this.body = this.$('.modal-body');
		this.title = this.$('.modal-title');

		var self = this;

		this.$('#myModal').modal().on('hidden.bs.modal', function () {
            self.destroy();
        });

		this.renderQuestions();

		return this;
	},

	renderQuestions: function(){
		app.dev.col.each(this.addOne,this);
	},

	addOne: function(item){
		var view = new app.AdminQuestionView({model:item});
		this.children.push(view);
		this.body.append(view.render().$el);
	},

	destroy: function(){
		this.children.each(function(item){
			item.remove();
		})
		this.remove();
	},

	closeModal: function(){
		this.$('#myModal').modal('hide');
	},	

	printQuestion: function(){
		return this.question.substr(0,100);
	},

	addQuestion: function(){
		app.dev.col.create({question:'Place your questio here'});
	},
})