import React from 'react';
import { withRouter } from 'react-router-dom';
import { State } from 'react-powerplug';
import { auth } from './firebase';
import * as routes from './constants/routes';

class SignIn extends React.Component {
  handleSubmit = ({ email, password }) => {
    return auth
      .doSignInWithEmailAndPassword(email, password)
      .then(response => {
        console.log('Successful Sign In', response);
        this.props.history.push(routes.HOME_PATH);
      })
      .catch(err => {
        console.log('Failed Sign In', err);
        throw err;
      });
  };

  render() {
    return (
      <State initial={{ email: '', password: '', error: null }}>
        {({ state, setState }) => {
          const onEmailChange = e => {
            setState({ email: e.target.value });
          };
          const onPasswordChange = e => {
            setState({ password: e.target.value });
          };
          const onSubmit = e => {
            e.preventDefault();
            this.handleSubmit({
              email: state.email,
              password: state.password,
            }).catch(err => {
              setState({ error: err.message });
            });
          };
/*<form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="Product">Product:</label>
                <input type="text" class="form-control" name="Product" value={Product} onChange={this.onChange} placeholder="Product" />
              </div>
              <div class="form-group">
                <label for="Amount">Amount:</label>
                <input type="text" class="form-control" name="Amount" value={Amount} onChange={this.onChange} placeholder="Amount" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
            */
          return (
            <div>
              
              <h1>Sign In</h1>
              <br/>
              <form onSubmit={onSubmit} class="w-50 mx-auto" >
                {state.error &&
                  <p style={{ color: 'red' }}>
                    {state.error}
                  </p>}
                  <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  class="form-control"
                  value={state.email}
                  
                  onChange={onEmailChange}
                />
                <br/>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  class="form-control"
                  value={state.password}
                  onChange={onPasswordChange}
                />
                <br/>
                <br/>
                <button type="submit" class="btn btn-success">Sign In</button>
              </form>
            </div>
          );
        }}
      </State>
    );
  }
}

export default withRouter(SignIn);
