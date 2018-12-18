var app = app || {};

app.TodoView = Backbone.View.extend({
    tagName: "li",

    itemTemplate: _.template($('#item-template').html()),

    events: {
        'dblclick label': 'edit',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'updateTitleOnFocusLost'
    },

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
        this.$el.html(this.itemTemplate(this.model.attributes));
        this.$input = this.$('.edit');
        return this;
    },

    edit: function() {
        this.$el.addClass('editing');
        this.$input.focus();
    },

    updateTitleOnFocusLost: function() {
        var value = this.$input.val().trim();
        if(value) {
            this.model.save({ 'model': value });
        }
        this.$el.removeClass('editing');
    },

    updateOnEnter: function(event) {
        if (event.which == 13) {
            this.updateTitleOnFocusLost();
        }
    }



});