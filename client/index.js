import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'

import App from './component/app';
import Login from './component/login';
import Dashboard from './component/dashboard';

import EventList from './component/eventList';
import EventEdit from './component/eventEdit';

import loginService from './service/login';

const NoMatch = React.createClass({
  render() {
    return (
      <div>NoMatch</div>
    )
  }
})

const Users = React.createClass({
  render() {
    return (
      <div>
        <h1>Users</h1>
        <div className="master">

        </div>
        <div className="detail">
          {this.props.children}
        </div>
      </div>
    )
  }
})

const User = React.createClass({
  componentDidMount() {
    this.setState({
      // route components are rendered with useful information, like URL params
      user: findUserById(this.props.params.userId)
    })
  },

  render() {
    return (
      <div>
        <h2>{this.state.user.name}</h2>
        {/* etc. */}
      </div>
    )
  }
})

function requireAuth(nextState, replace) {
  if (!loginService.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
render((
  <Router history={hashHistory}>
    <Route component={App}>
      <Route path="/" component={Dashboard} onEnter={requireAuth}>
        <Route path="users" component={Users}>
          <Route path="/user/:userId" component={User}/>
        </Route>
        <Route path="/events" component={EventList}/>
        <Route path="/event" component={EventEdit}/>
        <Route path="/event/:eventId" component={EventEdit}/>
      </Route>

      <Route path="login" component={Login}/>

      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>
), document.getElementById('bundle'))
