import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router";
import { useSelector } from "react-redux";

const Header = () => {
  const [loginbtn, setLoginbtn] = useState("Login");

  const togglelogin = () => {
    loginbtn === "Login" ? setLoginbtn("Logout") : setLoginbtn("Login");
  };

  const cartItems = useSelector((store) => store.cart.items);
  const userinfo = useSelector((store) => store.userinfo);

  return (
    <div className="flex items-center justify-between py-3 px-32 bg-primaryblack">
      {/* Logo */}
      <a href="/" className="no-underline">
        <img src={LOGO_URL} alt="Flowstate" className="w-15 h-15 rounded-md" />
      </a>

      {/* Navigation Items */}
      <div>
        <ul className="font-medium text-primarywhite flex items-center gap-12">
          <li className="list-none text-lg uppercase cursor-pointer transition-all duration-100 ease-in">
            <Link to="/" className="no-underline">
              Home
            </Link>
          </li>
          <li className="list-none text-lg uppercase cursor-pointer transition-all duration-100 ease-in">
            <Link to="/about" className="no-underline">
              About
            </Link>
          </li>
          <li className="list-none text-lg uppercase cursor-pointer transition-all duration-100 ease-in">
            <Link to="/cart" className="no-underline">
              Cart - ({cartItems.length} items)
            </Link>
          </li>
          <li className="list-none text-lg uppercase cursor-pointer transition-all duration-100 ease-in">
            <Link
              to="https://github.com/anshu189/flowstate"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              Github
            </Link>
          </li>

          {/* Login Button */}
          <button
            onClick={togglelogin}
            className="px-4 py-2 text-primaryblack bg-primarywhite rounded-lg"
          >
            {loginbtn}
          </button>

          <li className="list-none text-lg uppercase cursor-pointer transition-all duration-100 ease-in">
            {loginbtn === "Logout" ? "🟢 " + userinfo.name : ""}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
