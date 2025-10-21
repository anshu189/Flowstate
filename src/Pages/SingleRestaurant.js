import { useParams } from "react-router";
import { ProductnotFound } from "./Error";
import Shimmer from "../components/Shimmer";
import useResmenu from "../utils/useResmenu";

const SingleRestaurant = () => {
  const resid = useParams();
  const singleres = useResmenu(resid);

  return singleres.length === 0 ? (
    <Shimmer />
  ) : !singleres.id ? (
    <ProductnotFound />
  ) : (
    <div className="flex flex-col items-center justify-center px-32 overflow-hidden">
      <div className="flex flex-col gap-8 p-4 md:p-12 rounded-md">
        {/* Header */}
        <div className="flex items-center justify-between font-black text-accentdark">
          <h1 className="text-3xl md:text-4xl">{singleres.name}</h1>
          <span className="text-2xl md:text-3xl">
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
          </span>
        </div>

        {/* Tags */}
        <p className="tracking-wider text-lg md:text-xl">
          {singleres?.tags?.join(", ")}
        </p>

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
            <span className="font-light text-black">{singleres.servings}</span>
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
      </div>
    </div>
  );
};

export default SingleRestaurant;
