import React from 'react';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      return;
    }
    this.props.handleAuthorize(this.state.email, this.state.password);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {

    return (
      <div className="login">
        <p className="login__heading">
          Log in
        </p>
        <form onSubmit={this.handleSubmit} className="login__form">
          <input required id="email" name="email" type="text" placeholder="Email" value={this.state.username} onChange={this.handleChange} />
          <input required id="password" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
          <div className="login__button-container">
            <button type="submit" onSubmit={this.handleSubmit} className="login__button">Log in</button>
          </div>
        </form>

        <p className="login__text">Not a member yet? Sign up here!</p>

      </div>
    )
  }
}

export default withRouter(Login);
