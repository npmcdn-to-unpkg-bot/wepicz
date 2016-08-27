import React from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'


import loginService from '../service/login';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

const Login = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleTextChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    });
  },

  handleSubmit(e) {
    e.preventDefault();

    loginService.login(
      this.state.email,
      this.state.password
    ).then((data)=>{
      let dest = "/"

      if (this.props.location.state && this.props.location.state.nextPathname) {
        dest = this.props.location.state.nextPathname;
      }

      this.context.router.replace(dest)

    }, (error)=> {
      console.log(error);
    })
  },

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FieldGroup
            id="email"
            type="text"
            label="E-Mail"
            placeholder="Enter E-Mail"
            onChange={this.handleTextChange}
          />

          <FieldGroup
            id="password"
            type="password"
            label="Password"
            placeholder="Enter password"
            onChange={this.handleTextChange}
          />

          <Button type="submit">
            Submit
          </Button>
        </form>
      </div>

    )
  }
})

export default Login;
