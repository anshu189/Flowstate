import DrinksCard from "./DrinksCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { RESURL } from "../utils/constants";
import { NetworkError, ProductnotFound } from "../Pages/Error";

const Appbody = () => {
  const [maindata, setMaindata] = useState([]);
  const [searchquerydata, setSearchquerydata] = useState([]);
  const [searchvalue, setsearchvalue] = useState("");
  const [resError, setResError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchres, setSearchres] = useState({});

  const fetchRES = async () => {
    try {
      setResError(false);
      setLoading(true);
      const data = await fetch(RESURL);
      const jsondata = await data.json();
      const restaurantsdata = jsondata?.recipes;

      setMaindata(restaurantsdata);
      setSearchquerydata(restaurantsdata);
    } catch (err) {
      setResError(true);
    } finally {
      setLoading(false);
    }
  };

  // Filter based on rating
  const handleFilter = () => {
    const newfilterdata = maindata.filter((res) => res.rating > 4.8);
    setSearchquerydata(newfilterdata);
  };
  // Reset rating based filteration
  const handleresetFilter = () => {
    setSearchquerydata(maindata);
  };

  // Search Logic
  const handlesearch = () => {
    const searchdata = maindata.filter((res) => {
      return res.name.toLowerCase().includes(searchvalue);
    });
    setSearchres(searchdata);
    setSearchquerydata(searchdata);
  };

  useEffect(() => {
    fetchRES();
  }, []);

  return (
    <div className="Appbody-container">
      <div className="filter-container">
        <div className="search-container">
          <input
            className="searchinput"
            type="text"
            value={searchvalue}
            onChange={(e) => {
              setsearchvalue(e.target.value);
            }}
          />
          <button className="search-btn" onClick={() => handlesearch()}>
            Search
          </button>
        </div>

        <div className="filterbtn-container">
          <button className="filter-btn" onClick={() => handleFilter()}>
            Top Rated Restraunts
          </button>
          <button
            className="reset-filter-btn"
            onClick={() => handleresetFilter()}
          >
            Reset
          </button>
        </div>
      </div>
      <div className="drinks-container">
        {loading ? (
          <div className="shimmer-container">
            {[...Array(16).keys()].map((e) => {
              return <Shimmer key={e} />;
            })}
          </div>
        ) : resError ? (
          <NetworkError />
        ) : searchres.length === 0 ? (
          <ProductnotFound />
        ) : (
          searchquerydata.map((res) => <DrinksCard key={res.id} data={res} />)
        )}
      </div>
    </div>
  );
};

export default Appbody;
