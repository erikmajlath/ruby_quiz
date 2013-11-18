var app = app || {}

app.AnswerView = Backbone.View.extend({
	tagName: 'li',
	className: 'answer',

	events:{
		'click': 'toggle',
	},

	initialize: function(){
		console.log('AnswerView initialize');
		this.render();
	},

	render: function(){
		template = '<span class="glyphicon glyphicon-ok notVisible">\
					</span> \
					{{answer}}';

		this.$el.html(Mustache.render(template, this.model.toJSON()));
		return this;
	},

	toggle: function(){
		this.model.set('checked', !this.model.get('checked'));
		this.$el.toggleClass('checked');
		this.$('.glyphicon').toggleClass('notVisible');
	},
});
app.AnswersView = Backbone.View.extend({
	tagName: 'ul',

	initialize: function(){
		console.log('ANSWERSView initialize');
	},

	render: function(){
		this.collection.each(this.addOne, this);
		return this;
	},

	addOne: function(item){
		this.$el.append(new app.AnswerView({model: item}).$el);
	},
})