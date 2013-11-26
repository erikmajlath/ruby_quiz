var app = app || {}

app.Answer = Backbone.Model.extend({

    initialize: function(){
        //set defaults and rewrite server bullshit
        this.set('checked', false);
    },
});

app.Answers = Backbone.Collection.extend({
	model: app.Answer,
})