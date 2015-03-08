var React = require('react'),
    Parent = require('./app1/parent');

React.renderComponent(
  <Parent />,
  document.getElementById('app')
);
