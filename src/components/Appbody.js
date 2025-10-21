import DrinksCard, { difficultyDrinkCard } from "./DrinksCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { PAGE_SIZE, RESURL } from "../utils/constants";
import { NetworkError, ProductnotFound } from "../Pages/Error";
import { Link } from "react-router";
import { PAGE_SIZE } from "../utils/constants";
import usePagination from "../utils/usePagination";

const Appbody = () => {
  const [maindata, setMaindata] = useState([]);
  const [searchquerydata, setSearchquerydata] = useState([]);
  const [searchvalue, setsearchvalue] = useState("");
  const [resError, setResError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchres, setSearchres] = useState({});
  const [startitem, setStartitem] = useState(0);
  const [enditem, setEnditem] = useState(PAGE_SIZE);
  const DifficultyDrinksCard = difficultyDrinkCard(DrinksCard);

  const totalpages = Math.ceil(maindata.length / PAGE_SIZE);

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
    setsearchvalue("");
  };

  // Reset rating based filteration
  const handleresetFilter = () => {
    setSearchquerydata(maindata);
    setsearchvalue("");
  };

  // Search Logic
  const handlesearch = () => {
    const searchdata = maindata.filter((res) => {
      return res.name.toLowerCase().includes(searchvalue);
    });
    setSearchres(searchdata);
    setSearchquerydata(searchdata);
  };

  // Pagination Logic
  const handlePagination = (pagenumber) => {
    const paginationdata = usePagination(pagenumber);
    const { startitem, enditem } = paginationdata;
    setStartitem(startitem);
    setEnditem(enditem);
  };

  useEffect(() => {
    fetchRES();
  }, []);

  return (
    <div className="flex flex-col gap-8 py-10 px-32">
      {/* Filter Section */}
      <div className="flex items-center justify-between gap-4">
        {/* Search Box */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={searchvalue}
            onChange={(e) => setsearchvalue(e.target.value)}
            className="px-3 py-2 border-2 border-gray-200 rounded-md text-base outline-none transition-all duration-200 focus:border-gray-600"
            placeholder="Search..."
          />
          <button
            onClick={handlesearch}
            className="px-3 py-2 font-semibold border-2 border-primaryblack rounded-md text-primarywhite bg-primaryblack transition-all duration-200 hover:bg-[#000000]"
          >
            Search
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleFilter}
            className="px-3 py-2 font-semibold border-2 border-primaryblack rounded-md text-primarywhite bg-primaryblack transition-all duration-200 hover:bg-[#000000]"
          >
            Top Rated Restaurants
          </button>
          <button
            onClick={handleresetFilter}
            className="px-3 py-2 font-semibold border-2 border-primaryblack rounded-md text-primarywhite bg-primaryblack transition-all duration-200 hover:bg-[#000000]"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Drinks / Cards Section */}
      <div className="w-full flex flex-wrap gap-8">
        {loading ? (
          <div className="mt-16 flex flex-wrap items-center gap-8">
            {[...Array(16).keys()].map((e) => (
              <Shimmer key={e} />
            ))}
          </div>
        ) : resError ? (
          <NetworkError />
        ) : searchres.length === 0 ? (
          <ProductnotFound />
        ) : (
          searchquerydata.slice(startitem, enditem).map((res) => (
            <Link
              key={res.id}
              to={`/restaurant/${res.id}`}
              className="flex flex-col justify-start gap-4 flex-[0_0_24rem] w-full pb-4 text-center rounded-xl cursor-pointer overflow-hidden bg-primarywhite transition-all duration-300 ease-in-out outline outline-2 outline-white hover:shadow-[0_0_15px_rgba(90,90,90,0.3)] hover:-translate-y-1 hover:outline-accentdark filter drop-shadow-[0_0_2px_rgba(116,116,116,0.6)] no-underline text-primaryblack"
            >
              {res.reviewCount > 80 ? (
                <DifficultyDrinksCard data={res} />
              ) : (
                <DrinksCard data={res} />
              )}
            </Link>
          ))
        )}
      </div>
      {/* Pagination */}
      <div className="flex flex-row justify-center items-center gap-1 mt-6">
        {[...Array(totalpages).keys()].map((e) => (
          <button
            key={e}
            onClick={(e) => {
              handlePagination(e.target.textContent);
            }}
            className={`p-1 px-3 rounded border-2 hover:border-accentdark transition ${
              Math.ceil(enditem / PAGE_SIZE) === e + 1
                ? "border-accentdark bg-accentdark text-primarywhite"
                : "border-accentlight"
            }`}
          >
            {e + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Appbody;
