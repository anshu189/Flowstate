// import logo from "../assets/logo.jpg";

const Header = () => {
  return (
    <div className="Header-container">
      <a href="#" className="logo">
        {/* <img src={logo} alt="Flowstate" /> */}
        <img
          src="https://flowstatesolutions.ai/wp-content/uploads/2021/12/FS_Icon_Purple_Web-scaled.jpg"
          alt="Flowstate"
        />
      </a>
      <div className="Navitems-container">
        <ul>
          <li>Home</li>
          <li>Grab One</li>
          <li>Contact</li>
          <li>About</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
