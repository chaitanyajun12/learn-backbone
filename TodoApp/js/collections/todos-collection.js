var app = app || {};

app.TodosList = Backbone.Collection.extend({
    model: app.Todo,

    localStorage: new Backbone.LocalStorage('todos-backbone'),

    completed: function() {
        return app.Todos.models.filter(function(model) { 
            return model.get('completed'); 
        });
    },

    remaining: function() {
        return app.Todos.models.filter(function(model) { 
            return !model.get('completed'); 
        });
    },

    comparator: function() {

    }
});

app.Todos = new app.TodosList();