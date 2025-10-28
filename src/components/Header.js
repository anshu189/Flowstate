import { LOGO_URL } from "../utils/constants";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((store) => store?.cart?.items);
  const userinfo = useSelector((store) => store?.userinfo);

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
          {userinfo && (
            <div className="flex items-center gap-4">
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
              <li
                onClick={handlesignout}
                className="list-none text-lg uppercase cursor-pointer transition-all duration-100 ease-in"
              >
                Sign Out
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
