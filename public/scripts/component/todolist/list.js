var m = require('m-react');
var dataItem = require('./dataItem');
module.exports = m.createComponent({
    render: function (props, state) {
        return m('ul',{
            class:'todo-list',
        }, props.allTodos.map((item) => {
            return m(dataItem,item,false);
        }))
    }
})