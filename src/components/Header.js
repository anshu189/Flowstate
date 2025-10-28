import { LOGO_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { FaGithub } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((store) => store?.cart?.items);
  const userinfo = useSelector((store) => store?.userinfo);
  const [showprofile, setShowprofile] = useState(false);

  const handleshowprofile = () => {
    setShowprofile(!showprofile);
  };

  const handlesignout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  return (
    <div className="flex items-center justify-between py-3 px-32 bg-primaryblack">
      {/* Logo */}
      <a href="/" className="no-underline">
        <img src={LOGO_URL} alt="Flowstate" className="w-15 h-15 rounded-md" />
      </a>

      {/* Navigation Items */}
      <div>
        <ul className="text-lg text-primarywhite flex items-center gap-8">
          <li className="list-none cursor-pointer transition-all duration-100 ease-in">
            <Link to="/" className="no-underline">
              Home
            </Link>
          </li>
          <li className="list-none cursor-pointer transition-all duration-100 ease-in">
            <Link to="/about" className="no-underline">
              About
            </Link>
          </li>
          <li className="list-none cursor-pointer transition-all duration-100 ease-in">
            <Link to="/cart" className="no-underline">
              Cart - ({cartItems.length} items)
            </Link>
          </li>

          {/* Login Button */}
          {userinfo && (
            <div
              onClick={handleshowprofile}
              className="relative flex border-1 border-gray-600 rounded-md cursor-pointer"
            >
              <div className="flex items-center gap-4 py-1 px-3">
                {userinfo?.photoURL ? (
                  <img
                    src={userinfo?.photoURL}
                    alt={userinfo?.displayName}
                    className="w-10 h-10 rounded-full cursor-pointer"
                  />
                ) : (
                  <p className="text-sm font-light border-1 border-dashed py-1 px-2 rounded-full">
                    No photo
                  </p>
                )}
                <span>
                  <IoIosArrowDropdown className="w-6 h-6" />
                </span>
              </div>
              {showprofile && (
                <div className="absolute p-2 w-full flex flex-col gap-2 items-center justify-stretch text-center text-sm text-primarywhite bg-primaryblack top-14 rounded-md overflow-hidden">
                  <p className="w-full py-2 rounded-md hover:bg-black duration-300 ease-in-out">
                    {userinfo?.displayName}
                  </p>
                  <button
                    onClick={handlesignout}
                    className="w-full py-2 rounded-md hover:bg-black duration-300 ease-in-out"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}

          <li className="list-none text-lg uppercase cursor-pointer transition-all duration-100 ease-in">
            <Link
              to="https://github.com/anshu189/flowstate"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
            >
              <FaGithub className="w-8 h-8" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
