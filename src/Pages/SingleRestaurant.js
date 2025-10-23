import { useParams } from "react-router";
import { NetworkError, ProductnotFound } from "./Error";
import Shimmer from "../components/Shimmer";
import useResmenu from "../utils/useResmenu";
import SingleRestaurantAccordion from "../components/SingleRestaurantAccordion";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";

const SingleRestaurant = () => {
  const resid = useParams();
  const dispatch = useDispatch();
  const [showaccordion, setShowaccordion] = useState(null);
  const { singleres, resmnuerror, loading } = useResmenu(resid);

  const accordionkeys = Object.keys(singleres).filter(
    (key) => key === "ingredients" || key === "instructions"
  );

  const accordiondata = accordionkeys.map((e) => ({
    name: e,
    content: singleres[e],
  }));

  const handleCart = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div className="flex flex-col items-center justify-center px-32 overflow-hidden">
      {loading ? (
        <div className="mt-16 flex items-center gap-8">
          {[...Array(3).keys()].map((e) => (
            <Shimmer key={e} />
          ))}
        </div>
      ) : resmnuerror ? (
        <NetworkError />
      ) : singleres.length === 0 ? (
        <ProductnotFound />
      ) : (
        <div className="flex flex-col gap-6 p-4 md:p-12 rounded-md">
          {/* Header */}
          <div className="flex items-start justify-between font-black text-accentdark">
            <h1 className="text-3xl md:text-4xl">{singleres.name}</h1>
            <span className="text-2xl md:text-3xl">
              <div>
                {singleres?.rating && (
                  <>
                    {singleres.rating}{" "}
                    {[...Array(Math.floor(Number(singleres.rating) || 0))].map(
                      (_, i) => (
                        <span key={i}>★</span>
                      )
                    )}
                  </>
                )}
              </div>
            </span>
          </div>
          {/* Tags */}
          <div className="flex justify-between ">
            <p className="tracking-wider text-lg md:text-xl">
              {singleres?.tags?.join(", ")}
            </p>
            <button
              onClick={() => handleCart(singleres.name)}
              className="px-16 p-2 text-lg font-medium text-primarywhite bg-primaryblack rounded-md"
            >
              Add
            </button>
          </div>
          {/* Image */}
          <div
            className="w-[1300px] h-[300px] rounded-lg bg-cover bg-center bg-no-repeat relative shadow-md"
            style={{ backgroundImage: `url(${singleres.image})` }}
          ></div>
          {/* Info Section */}
          <div className="flex flex-col gap-1 text-[22px] font-semibold p-6 border border-gray-300 rounded-xl text-accentdark">
            <p>
              Difficulty:{" "}
              <span className="font-light text-black">
                {singleres.difficulty}
              </span>
            </p>
            <p>
              Cuisine:{" "}
              <span className="font-light text-black">{singleres.cuisine}</span>
            </p>
            <p>
              Meal Type:{" "}
              <span className="font-light text-black">
                {singleres.mealType?.join(", ")}
              </span>
            </p>
            <p>
              Servings:{" "}
              <span className="font-light text-black">
                {singleres.servings}
              </span>
            </p>

            {/* Total Time */}
            <div>
              <p>Total Time:</p>
              <ul className="list-none">
                <li className="text-[20px] text-black">
                  Preparation:{" "}
                  <span className="font-light text-black">
                    {singleres.prepTimeMinutes} min
                  </span>
                </li>
                <li className="text-[20px] text-black">
                  Cooking:{" "}
                  <span className="font-light text-black">
                    {singleres.cookTimeMinutes} min
                  </span>
                </li>
              </ul>
            </div>
          </div>
          {/* Instructions and Ingredients */}
          {accordiondata.map((item, i) => (
            // Controlled Component
            <SingleRestaurantAccordion
              key={i}
              name={item.name}
              data={item.content}
              showitems={i === showaccordion ? true : false}
              setShowaccordion={() =>
                setShowaccordion(showaccordion === i ? null : i)
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleRestaurant;
