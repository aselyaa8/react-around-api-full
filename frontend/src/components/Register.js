import React from 'react';
import { withRouter } from 'react-router-dom';


class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.password === this.state.confirmPassword) {
      this.props.handleRegister(this.state.email, this.state.password)
    }
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
          Sign up
        </p>
        <form onSubmit={this.handleSubmit} className="login__form">
          <input required id="email" name="email" type="text" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
          <input required id="password" name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
          <input id="confirmPassword" name="confirmPassword" type="password" value={this.state.confirmPassword} onChange={this.handleChange} placeholder="Confirm Password" required />
          <div className="login__button-container">
            <button type="submit" onSubmit={this.handleSubmit} className="login__button">Sign Up</button>
          </div>
        </form>
        <p className="login__text">Already a member? Log in here!</p>

      </div>
    )
  }
}

export default withRouter(Register);
