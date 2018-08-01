import React from 'react';
import { Redirect } from 'react-router-dom';
import fakeAuth from '../utils/fakeAuth';

class Login extends React.Component {
  state = {
    redirectToReferrer: false,
  };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className='login'>
        <p>You must log in</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

export default Login;
