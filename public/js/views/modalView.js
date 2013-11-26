// js/views/modal.js

var app = app || {};

// Modal view
// show modal dialog with custom content in backbone convention

app.ModalView = Backbone.View.extend({
    
    events: {
        'click .close': 'closeModal',
        'click .submit': 'submit',
    },
        
    initialize: function(){
        this.render();
    },
        
    render: function(){
        var self = this;
        var html = Mustache.render( $('#modal-template').html(),
                                   this.options.data,
                                   {content: this.options.template});
        this.$el.html(html);
        $('body').prepend(this.$el);
        
        //bootstrap modal. After hidding remove it from document
        this.$('#myModal').modal().on('hidden.bs.modal', function () {
            self.remove();
        });
    },
    
    closeModal: function(e){
        this.$('#myModal').modal('hide');

    },
    
    serialize: function(){
        var o = {};
        var a = this.$('form').serializeArray();
        $.each(a, function() {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    },
    
    submit: function(e){
        e.preventDefault();
        var data = this.serialize();
        this.options.context = this.options.context || this;
        this.options.callback.apply(this.options.context, [data]);
        this.closeModal();
    },
});

