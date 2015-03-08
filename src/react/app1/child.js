var React = require('react');

var Child = React.createClass({
  render: function(){
    var listItems = this.props.children.map(function(child){
      return <li> {child.name} is {child.age} years old.</li>;
    });
    return (
      <div>
        <h3> Children </h3>
        <ul>
          {listItems}
        </ul>
      </div>
    )
  }
});

module.exports = Child;