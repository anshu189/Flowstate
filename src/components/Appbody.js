import DrinksCard from "./DrinksCard";
import apidata from "../utils/data";
import { useState } from "react";
import Shimmer from "./Shimmer";

const Appbody = () => {
  const [maindata, setMaindata] = useState(apidata);
  const [searchquerydata, setSearchquerydata] = useState(apidata);
  const [searchvalue, setsearchvalue] = useState("");

  // Filter based on rating
  const handleFilter = () => {
    const newfilterdata = maindata.filter((res) => res.info.avgRating > 4.2);
    setSearchquerydata(newfilterdata);
  };
  // Reset rating based filteration
  const handleresetFilter = () => {
    setSearchquerydata(maindata);
  };

  // Search Logic
  const handlesearch = () => {
    const searchdata = maindata.filter((res) => {
      return res.info.name.toLowerCase().includes(searchvalue);
    });
    // console.log(searchquerydata);
    setSearchquerydata(searchdata);
  };

  return maindata === 0 ? (
    <div className="shimmer-container">
      {[...Array(18).keys()].map((e) => {
        return <Shimmer />;
      })}
    </div>
  ) : (
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
        {searchquerydata.length === 0 ? (
          <p>No Data Found!</p>
        ) : (
          searchquerydata.map((res) => (
            <DrinksCard key={res.info.id} data={res} />
          ))
        )}
      </div>
    </div>
  );
};

export default Appbody;
