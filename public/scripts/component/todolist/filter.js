var m = require('m-react');
var eventEmit = require('../eventEmitter');
module.exports = m.createComponent({
        defaultProps: {
            count: 0,
        },
        render: function(props, state){
            return m('section', [
              m('p', {
                styles:{
                    width:'100px',
                    height:'20px'
                },
              },props.count+'Items'),

              m('label', 'all',[
                m('input', {
                    type: 'radio',
                    name: 'filter',
                    value: 'all',
                    checked: this.state.value=='all',
                    evChange: this.onChange
                 })
              ]),

              m('label', 'active',[
                m('input', {
                    type: 'radio',
                    name: 'filter',
                    value: 'active',
                    checked: this.state.value=='active',
                    evChange: this.onChange
                 })
              ]),

              m('label', 'complete',[
                m('input', {
                    type: 'radio',
                    name: 'filter',
                    value: 'complete',
                    checked: this.state.value=='complete',
                    evChange: this.onChange
                 })
              ]),
        
            ]);
        },
        getInitialState: function(){
            return {
                count: '0',
                value:'all'
            };
        },
        onChange: function(ev){
           this.state.value=ev.target.value.trim();
           eventEmit.dispatch('onFilter',ev.target.value)
        
        }
    
    });