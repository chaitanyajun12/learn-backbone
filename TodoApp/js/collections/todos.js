var app = app || {};

app.TodosList = Backbone.Collection.extend({
    model: app.Todo,

    localStorage: new Backbone.LocalStorage('todos-backbone'),

    completed: function() {
        return this.filter(function() {
            return this.get('completed');
        });
    },

    remaining: function() {
        
    },

    comparator: function() {

    }
});

app.Todos = new app.TodosList();