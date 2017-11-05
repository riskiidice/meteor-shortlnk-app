import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error: ''
    };
  }
  onSubmit(e){
      e.preventDefault();

      let email = this.refs.email.value.trim();
      let password = this.refs.password.value.trim();

      if(password.length < 4) {
        return this.setState({error: 'Password must be more than 4 charecter'})
      }
      let userObject = {
        email: email,
        password: password
      };

      Accounts.createUser(userObject, (err) => {
          if(err) {
            this.setState({
              error: err.reason
            });
          }else{
            this.setState({
              error: ''
            });
          }
      });

  }

  render(){
    return (
      <div>
          <h1>Join Short Link </h1>
          { this.state.error ? <p>{this.state.error}</p> : undefined }
          <form onSubmit={this.onSubmit.bind(this)} noValidate>
            <input type="text" ref="email" name="email" placeholder="Email" />
            <input type="password" ref="password" name="password" placeholder="Password" />
            <button type="submit">Create Account</button>
          </form>
          <Link to="/">Already have an account?</Link>
      </div>
    );
  }
}
