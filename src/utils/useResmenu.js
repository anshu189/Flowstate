import { useEffect, useState } from "react";
import { RESURL } from "../utils/constants";

const useResmenu = (resid) => {
  const [singleres, setSingleres] = useState([]);
  useEffect((e) => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const menudata = await fetch(RESURL + "/" + resid.resid);
      const jsonmenudata = await menudata.json();
      setSingleres(jsonmenudata);
    } catch (err) {
      console.error(err);
    }
  };

  return singleres;
};

export default useResmenu;
