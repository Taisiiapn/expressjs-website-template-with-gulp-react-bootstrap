var React = require('react'),
    Child = require('./child');

var Parent = React.createClass({
  getInitialState: function(){
    return {
      parents: 'Tom and Mary',
      children: [{name : 'John', age: 10}, {name : 'Betty', age: 5}, {name : 'Adam', age: 3}]
    }
  },
  render: function(){
    return (
      <div>
        <div> The parent are named {this.state.parents}. </div>
        <Child name="child"/>
      </div>
    )
  }
});

module.exports = Parent;