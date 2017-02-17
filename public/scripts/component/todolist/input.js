var m = require('m-react');
var store = require('../store');
var eventEmit = require('../eventEmitter');
var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

module.exports = m.createComponent({
    render: function (props, state) {
        return m('div', [
            m('p', {
                style: {
                    'backgroundColor': props.backgroundColor
                }
            }, state.date),
            m('span',{
                class:'header'
            }, [
                m('input', {
                    type: "checkbox",
                    class: 'toggle-all',
                    id:'toggle-all',
                    checked:this.state.checked,
                    evChange:this.onHandelToggle

                    
                }),
                m('input', {
                    type: 'text',
                    value: this.state.text,
                    style:{
                        border:'none'
                    },
                    placeHolder: "what needs to do?",
                    evKeyUp: this.onHandleNewTodoKeyUp
                }),
                m('button', {
                    evClick: this.onClickBtn
                }, 'save')
            ])

        ]);
    },
    getInitialState: function () {
        return {
            checked:true,
            date: (new Date).toString(),
            text: ''
        };
    },
    onClickBtn: function (ev) {

        if (this.state.text == '') {
            alert('内容不能为空');
            return;
        }
        eventEmit.dispatch('onSaveTodoItem', this.state.text);
        this.state.text = '';

    },


    onHandelToggle: function (ev){
        this.setState({checked:ev.target.checked});
        eventEmit.dispatch('onAllToggle', ev.target.checked);
    },

    onHandleNewTodoKeyUp: function (ev) {
        var val = ev.target.value.trim();
        if (ev.which === ESCAPE_KEY) {
            this.setState({
                text: ''
            });
        } else if (ev.which === ENTER_KEY && val !== '') {

            if (this.props.onTodoCreated)
                this.props.onTodoCreated({
                    val: val
                });
            this.setState({
                text: ''
            });
        } else {
            this.setState({
                text: val
            });
        }
    },
    componentDidMount: function () {
        var self = this;
        this.timer = setInterval(function () {
            self.setState({
                date: (new Date).toString()
            });
        }, 1000);
    },
    componentWillUnmount: function () {
        clearTimeout(this.timer);
    }

});