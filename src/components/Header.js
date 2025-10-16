import { useState } from "react";
import { LOGO_URL } from "../utils/constants";

const Header = () => {
  const [loginbtn, setLoginbtn] = useState("Login");

  const togglelogin = () => {
    loginbtn === "Login" ? setLoginbtn("Logout") : setLoginbtn("Login");
  };

  return (
    <div className="Header-container">
      <a href="#" className="logo">
        <img src={LOGO_URL} alt="Flowstate" />
      </a>
      <div className="Navitems-container">
        <ul>
          <li>Home</li>
          <li>Grab One</li>
          <li>Contact</li>
          <li>About</li>
          <button className="login-btn" onClick={() => togglelogin()}>
            {loginbtn}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
