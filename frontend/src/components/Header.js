import logo from '../images/logo.svg';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

function Header(props) {
  const location = useLocation();
  const history = useHistory();
  let headerButtonText = "";
  let headerButtonOnClick = null;

  if (location.pathname === '/signin') {
    headerButtonText = "Sign Up";
    headerButtonOnClick = () => { history.push('/signup') };
  } else if (location.pathname === '/signup') {
    headerButtonText = "Log in";
    headerButtonOnClick = () => { history.push('/signin') };
  } else if (location.pathname === '/') {
    headerButtonText = "Sign Out";
    headerButtonOnClick = props.handleSignOut;
  }

  return (
    <header className="header">
      <img src={logo} alt="Around U.S." className="logo" />
      <button onClick={headerButtonOnClick} className="header__link">{headerButtonText}</button>
    </header>);
}

export default Header;
