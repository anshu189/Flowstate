import Header from "./components/Header";
import Appbody from "./components/Appbody";

/*
- Header
  - Logo
  - Nav Items
    - Home
    - Grab One
    - Contact
    - About
- Body
  - Drinks Container
    - Drinks Card
      - Name
      - Caffine %   
      - Rating
  - Featured Drinks
  - Best Selling
- Footer
  - Copyright
  - Quick links
  - Contact
*/

const App = () => (
  <div className="app light">
    <Header />
    <Appbody />
  </div>
);

export default App;
