import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router";

const Header = () => {
  const [loginbtn, setLoginbtn] = useState("Login");

  const togglelogin = () => {
    loginbtn === "Login" ? setLoginbtn("Logout") : setLoginbtn("Login");
  };

  return (
    <div className="Header-container">
      <a href="/" className="logo">
        <img src={LOGO_URL} alt="Flowstate" />
      </a>
      <div className="Navitems-container">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/shop">Grab One</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <button className="login-btn" onClick={() => togglelogin()}>
            {loginbtn}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
