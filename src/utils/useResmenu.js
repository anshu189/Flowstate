import { useEffect, useState } from "react";
import { RESURL } from "../utils/constants";

const useResmenu = (resid) => {
  const [singleres, setSingleres] = useState([]);
  const [resmnuerror, setResmenuerror] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect((e) => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      setResmenuerror(false);
      setLoading(true);
      const menudata = await fetch(RESURL + "/" + resid.resid);
      const jsonmenudata = await menudata.json();
      setSingleres(jsonmenudata);
    } catch (err) {
      console.error(err);
      setResmenuerror(true);
    } finally {
      setLoading(false);
    }
  };

  return { singleres, resmnuerror, loading };
};

export default useResmenu;
