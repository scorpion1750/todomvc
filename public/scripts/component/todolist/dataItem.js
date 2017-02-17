var m = require('m-react');
var eventEmit = require('../eventEmitter');

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;
module.exports = m.createComponent({


    render: function (props, state) {

        this.setState({
            id: props.id,
            status: props.status,
            content: props.content
        })
        return m('li', {

            evMouseOver: this.onHandleMouseOver,
            evMouseOut: this.onHandleMouseOut,
        }, [
            m('input', {
                id: 'checkbox' + props.id,
                type: 'checkbox',
                checked: props.status == 'complete',
                evClick: this.onChangeTodoStatus
            }),
            m('input', {
                id: 'input' + props.id,
                class: props.status,
                value: props.content,
                evKeyUp: this.onHandleNewTodoKeyUp,
                evMouseOver: this.onHandleMouseOver,
                evMouseOut: this.onEditTodItem,
                readonly: this.state.readonly,
                ondblclick: this.onHandleDbClick
            }),
            m('button', {
                style: {
                    visibility: this.state.visibility
                },
                evClick: this.onDeleteTodoItem
            }, 'delete')
        ])

    },
    ///初始化时需要将可变的state声明
    getInitialState: function () {

        return {

            visibility: 'hidden',
            readonly: 'readonly'
        };
    },


    onEditTodItem: function (ev) {
        document.getElementById(ev.target.id).setAttribute('readonly', 'readonly');
        this.setState({
            visibility: 'hidden'
        });
    },
    componentDidUpdate: function () {
        document.getElementById('checkbox' + this.state.id).checked = this.state.status == "complete"

    },
    onHandleDbClick: function (ev) {

        document.getElementById(ev.target.id).removeAttribute('readonly');

    },
    onHandleMouseOut: function (ev) {

        this.setState({
            visibility: 'hidden'
        });


    },
    onHandleMouseOver: function (ev) {

        this.setState({
            visibility: 'visible'
        });
    },
    onChangeTodoStatus: function (ev) {

        var todo = {
            id: this.state.id,
            status: ev.target.checked ? 'complete' : 'active'
        }

        eventEmit.dispatch('onUpdateTodoItem', todo);

    },
    onDeleteTodoItem: function (ev) {
        eventEmit.dispatch('onDestroyTodoItem', this.state.id);

    },
    onHandleNewTodoKeyUp: function (ev) {
        var val = ev.target.value.trim();
        if (ev.which === ESCAPE_KEY) {
            this.setState({
                content: ''
            });
        } else if (ev.which === ENTER_KEY && val !== '') {

            if (this.props.onTodoCreated)
                this.props.onTodoCreated({
                    val: val
                });
            this.setState({
                content: ''
            });
        } else {
            this.setState({
                content: val
            });
        }
        var todo = {
            id: this.state.id,
            content: this.state.content
        }

        eventEmit.dispatch('onUpdateTodoItem', todo);

    },


});