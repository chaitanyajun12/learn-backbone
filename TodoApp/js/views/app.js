var app = app || {};

app.AppView = Backbone.View.extend({

    el: "#todoapp",

    statsTemplate: _.template($('#stats-template').html()),

    events: {
        'keypress #new-todo': 'createOnEnter',
        'click #clear-completed': 'clearCompleted',
        'click #toggle-all': 'toggleAllComplete'
    },

    initialize: function() {
        this.allCheckbox = this.$('#toggle-all')[0];
        this.$input = this.$("#new-todo");
        this.$footer = this.$("#footer");
        this.$main = this.$("#main");

        this.listenTo(app.Todos, 'add', this.addOne);
        this.listenTo(app.Todos, 'reset', this.addAll);
        this.listenTo(app.Todos, 'filter', this.filterAll);
        // this.listenTo(app.Todos, 'change:completed', );

        this.listenTo(app.Todos, 'all', this.render);

        app.Todos.fetch();        
    },

    render: function() {
        var completed = app.Todos.completed().length;
        var remaining = app.Todos.remaining().length;

        if (app.Todos.length) {
            this.$main.show();
            this.$footer.show();

            this.$footer.html(this.statsTemplate({
                'completed': completed,
                'remaining': remaining
            }));

        } else {
            this.$main.hide();
            this.$footer.hide();
        }

        this.allCheckbox.checked = !remaining;
    },

    filterAll: function() {
        console.log("filterAll: " + app.TodoFilter);
    },

    addOne: function(todo) {
        var view = new app.TodoView({model: todo});
        $("#todo-list").append(view.render().el);        
    },

    addAll: function() {
        this.$("#todo-list").html('');
        this.app.Todos.each(this.addOne, this);
    },

    newAttributes: function() {
        return {
            'title': this.$input.val().trim(),
            'completed': false,
            'order': ''
        };
    },

    createOnEnter: function() {
        if (event.which !== 13 || !this.$input.val().trim()) {
            return;
        }
        
        app.Todos.create(this.newAttributes());
        this.$input.val('');
    },

    clearCompleted: function() {
        _.invoke(app.Todos.completed(), 'destroy');
        return false;
    },

    toggleAllComplete: function() {
        var completed = this.allCheckbox.checked;

        app.Todos.each(function(todo) {
            todo.save({
                'completed': completed
            });
        });
    }

});