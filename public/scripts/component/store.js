var bSearch = require('./utils').bSearch;
var store = {
    todos: [

        // {
        //     id: 1,
        //     content: "第1个item",
        //     status: "complete"
        // },
        // {
        //     id: 2,
        //     content: "第2个item",
        //     status: "complete"
        // },
        // {
        //     id: 3,
        //     content: "第3个item",
        //     status: "complete"
        // },
        // {
        //     id: 4,
        //     content: "第4个item",
        //     status: "active"
        // },
        // {
        //     id: 5,
        //     content: "第5个item",
        //     status: "active"
        // }

    ],
    filter: 'all',
    nextId: 0
}

module.exports = {

    filter: function () {
        if (arguments.length === 0) {
            return store.filter;
        } else {
            store.filter = arguments[0];
           
        }

    },

    addTodoItem: function (content) {

        var newTodo = {
            content: content,
            status: 'active'
        };
        newTodo.id = store.nextId;
        store.todos.unshift(newTodo);

        store.nextId++;
    },

    updateTodoItem: function (id, item) {

        var todoIdx = bSearch(store.todos, id, _compare);
        _update(item,store.todos[todoIdx]);
    },

    deleteTodoItem: function (id) {

       
        var todoIdx = bSearch(store.todos, id, _compare);
        if (todoIdx !== -1) {
            store.todos.splice(todoIdx, 1);
        }
       
    },

    shownTodos: function () {
        return store.todos.filter(function (item) {
            switch (store.filter) {
                case 'active':
                    return item.status=="active";
                case 'complete':
                    return item.status=="complete";
                default:
                    return true;
            }
        });
    },

    getAllTodos: function () {
        return store.todos;
    },

    triggerUpdate: function () {
       
    },
    onUpdate: function (fn) {
        this._onUpdate = fn;
    }

}


function _compare(targetId, todo) {
    return todo.id - targetId;
}

function _update(updates, todo) {
    Object.keys(updates).forEach(function (k) {
        todo[k] = updates[k];
    });
   
    return todo;
}