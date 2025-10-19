import { useEffect } from "react";
import { MENUURL } from "../utils/constants";

const SingleRestaurant = () => {
  useEffect((e) => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      menudata = await fetch(MENUURL);
      const jsonmenudata = await menudata.json();
      console.log("Menu Data:", jsonmenudata);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Restaurant Name</h1>
      <p>Description</p>
      <ul>
        <li>Menu Items</li>
        <li>Menu Items</li>
        <li>Menu Items</li>
        <li>Menu Items</li>
        <li>Menu Items</li>
      </ul>
    </div>
  );
};

export default SingleRestaurant;
