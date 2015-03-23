var React = require('react');

var teams = [
  {name: 'Team 1', projects: [
    {name: 'project 1', designs: [
      {name: 'test 1', size: '123 MB'},
      {name: 'wow 2', size: '23 MB'},
      {name: 'wow 3', size: '153 MB'},
      {name: 'hmmm 3', size: '3 MB'}
    ]},
    {name: 'project 2', designs: [
      {name: 'test a', size: '123 MB'},
      {name: 'test b', size: '432 MB'},
    ]},
  ]},
  {name: 'Team 2', projects: [
    {name: 'project Z', designs: [
      {name: 'hello test xyz', size: '55 MB'},
      {name: 'test 5 xYz', size: '15 MB'},
      {name: 'hmmm 6 xyz', size: '23 MB'}
    ]},
    {name: 'project b', designs: []},
  ]},
  {name: 'Team 3', projects: []},
  {name: 'Team 4', projects: [
    {name: 'project Z', designs: [
      {name: 'hello test xyz', size: '55 MB'},
      {name: 'test 5 xYz', size: '15 MB'},
      {name: 'hmmm 6 xyz', size: '23 MB'}
    ]},
    {name: 'project b', designs: []},
  ]}
];

var Design = React.createClass({
  render: function () {
    return (
      <tr>
        <td>{this.props.design.name}</td>
        <td>{this.props.design.size}</td>
      </tr>
    );
  }
});

var Project = React.createClass({
  render: function () {
    var filterText = this.props.filterText
    var designs = this.props.designs
    .filter(function (element) {
      return element.name.indexOf(filterText) > -1
    })
    .map(function (design) {
      return <Design key={design.name} design={design} />
    });

    if (designs.length > 0) {
      return (
        <li>
          <h5>{this.props.project.name}</h5>
          <table className="table">
            <tbody>
            <tr>
              <th>Design</th>
              <th>Size</th>
            </tr>
            {designs}
            </tbody>
          </table>
        </li>
      );
    }
    else {
      return (
        <div></div>
      )
    }
  }
});

var Team = React.createClass({
  clickAddCounter : function(team) {
    if (team.counter === undefined) {team.counter = 0;}
    team.counter += 1;
    this.props.onSetTeamState(team)
    //if (this.props.team.counter === undefined) { 
      //this.props.team.counter = 1;
    //}
    //this.props.team.counter += 1;
    //alert('here: ' + team.name + '  ' + this.props.team.name + '   ' + this.props.team.counter);
    //this.setProps({seconds: this.props.team.seconds + 1});
  },
  render: function () {
    var filterText = this.props.filterText
    var projects = this.props.projects.map(function (project) {
      if (project.designs.length > 0) {
        return <Project
          key={project.name}
          project={project}
          designs={project.designs}
          filterText={filterText}
        />
      }
    });

    var teamCounter = '';

    if (this.props.team.counter !== undefined) {teamCounter = ' COUNT=' + this.props.team.counter;}

    if (projects.length > 0) {
      return (
        <div>
          <h4 onClick={this.clickAddCounter.bind(this, this.props.team)}>{this.props.team.name + ' ' + teamCounter}</h4>
          <ul>
            {projects}
          </ul>
        </div>
      );
    }
    else {
      return (
        <div>
          No results found for <span onClick={this.clickAddCounter.bind(this, this.props.team)}>{this.props.team.name + ' ' + teamCounter}</span>
        </div>
      );
    }
  }
});

var TeamTree = React.createClass({
  setTeamState: function(team) {
    //alert('team!' + JSON.stringify(team));
    this.setState({team: team});
  },
  render: function () {
    var filterText = this.props.filterText
    var $this = this;
    var teams = this.props.teams.map(function (team) {
      //if (team.projects.length > 0) {
        return <Team
          key={team.name}
          filterText={filterText}
          team={team}
          projects={team.projects}
          onSetTeamState={$this.setTeamState}
        />
      //}
    });

    return (
      <div>
        {teams}
      </div>
    );
  }
});

var SearchBar = React.createClass({
  handleChange: function() {
    this.props.onUserInput(this.refs.filterTextInput.getDOMNode().value);
  },
  render: function() {
    return (
      <form>
        <input className="form-control" type="text" ref="filterTextInput" 
          onChange={this.handleChange} 
          placeholder="Filter by Design..." 
          value={this.props.filterText} />
      </form>
    );
  }
});

var TreeSearch = React.createClass({
  getInitialState: function() {
    return {
      filterText: ''
    };
  },
  handleUserInput: function(filterText) {
    this.setState({
        filterText: filterText,
    });
  },
  render: function () {
    var divStyle = {
      width: "300px"
    };
    return (
      <div style={divStyle}>
        <SearchBar
          filterText={this.state.filterText}
          onUserInput={this.handleUserInput}
        />
        <TeamTree
          filterText={this.state.filterText}
          teams={this.props.teams}
        />
      </div>
    );
  }
});

React.render(
  <TreeSearch teams={teams} />, 
  document.getElementById('content-body')
);
