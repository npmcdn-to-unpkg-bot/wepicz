import React from 'react'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import axios from 'axios';

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

  handleTextChange(e) {
    //this.setState({text: e.target.value});
    console.log(e.target.id);
    console.log(e.target.value);

  },

  handleSubmit(e) {
      e.preventDefault();

      axios.post('/login', {
          firstName: 'Fred',
          lastName: 'Flintstone'
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      // var author = this.state.author.trim();
      // var text = this.state.text.trim();
      // if (!text || !author) {
      //   return;
      // }
      // // TODO: send request to the server
      // this.setState({author: '', text: ''});
      console.log('form-submit');
  },

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <FieldGroup
            id="username"
            type="text"
            label="Username"
            placeholder="Enter username"
            onChange={this.handleTextChange}
          />

          <FieldGroup
            id="password"
            type="password"
            label="Password"
            placeholder="Enter password"
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
