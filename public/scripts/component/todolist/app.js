var m = require('m-react');
var input = require('./input');
var filter = require('./filter');
var list = require('./list');
var store = require('../store');
var eventEmit = require('../eventEmitter');
var rootElm = document.getElementById('todoapp');

var app = m.createComponent({

    render: function (props, state) {
        return m('div', [
            m(input, {
                backgroundColor: "yellow",
                onSaveTodoItem: this.handleSaveTodoItem
            }),
            m(list, {
                allTodos: this.state.allTodos,
                onUpdateTodoItem: this.handleUpdateTodoItem,
                onDestroyTodoItem: this.handleDestroyTodoItem
            }),
            m(filter, {
                count: this.state.allTodos.length,
                onFilter: this.handleFilter
            })
        ])
    },
    componentDidMount: function () {
        var self = this;

        eventEmit.subscribe('onUpdateTodoItem', function (todo) {
            store.updateTodoItem(todo.id, todo);

            self.setState({
                allTodos: store.shownTodos(store.getAllTodos())
            });

        })

        eventEmit.subscribe('onDestroyTodoItem', function (id) {
            store.deleteTodoItem(id);
            self.setState({
                allTodos: store.shownTodos(store.getAllTodos())
            });
        })
        eventEmit.subscribe('onSaveTodoItem', function (content) {
            store.addTodoItem(content);
            self.setState({
                allTodos: store.shownTodos(store.getAllTodos())
            });
        })
        eventEmit.subscribe('onFilter', function (status) {
            store.filter(status);
            self.setState({
                allTodos: store.shownTodos(store.getAllTodos())
            });
        })
        eventEmit.subscribe('onAllToggle', function (toggle) {
            if (toggle) {
                self.setState({
                    allTodos: store.shownTodos(store.getAllTodos())
                });
            } else {
                self.setState({
                    allTodos: []
                });
            }
            

        })
    },
    componentWillUnMount: function () {
        eventEmit.unSubscribe('onUpdateTodoItem');
        eventEmit.unSubscribe('onDestroyTodoItem');
        eventEmit.unSubscribe('onSaveTodoItem');
        eventEmit.unSubscribe('onFilter');
    },
    getInitialState: function () {
        return {
            allTodos: store.getAllTodos()
        }
    }

});




m.mount(rootElm, m(app, {
    backgroundColor: "yellow"
}));