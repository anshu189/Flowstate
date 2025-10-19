import { useEffect, useState } from "react";
import { RESURL } from "../utils/constants";
import { useParams } from "react-router";
import { ProductnotFound } from "./Error";
import Shimmer from "../components/Shimmer";

const SingleRestaurant = () => {
  const resid = useParams();
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

  return singleres.length === 0 ? (
    <Shimmer />
  ) : !singleres.id ? (
    <ProductnotFound />
  ) : (
    <div className="single-restaurant-container">
      <div className="single-restaurant-container2">
        <div className="single-restaurant-info">
          <div className="single-restaurant-header">
            <h1>{singleres.name}</h1>
            <span className="rating">
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
          <p className="single-restaurant-tags">
            {singleres?.tags?.join(", ")}
          </p>
        </div>
        <div
          className="single-restaurant-image-container"
          style={{
            backgroundImage: `url(${singleres.image})`,
          }}
        ></div>
        <div className="single-restaurant-moreinfo">
          <p>
            Difficulty:{" "}
            <span className="single-restaurant-categorytype">
              {singleres.difficulty}
            </span>
          </p>
          <p>
            Cuisine:{" "}
            <span className="single-restaurant-categorytype">
              {singleres.cuisine}
            </span>
          </p>
          <p>
            Meal Type:{" "}
            <span className="single-restaurant-categorytype">
              {singleres.mealType?.join(", ")}
            </span>
          </p>
          <p>
            Servings:{" "}
            <span className="single-restaurant-categorytype">
              {singleres.servings}
            </span>
          </p>
          <div className="single-restaurant-totaltime">
            <p>Total Time: </p>
            <ul>
              <li>
                Preparation:{" "}
                <span className="single-restaurant-categorytype">
                  {singleres.prepTimeMinutes} min
                </span>
              </li>
              <li>
                Cooking:{" "}
                <span className="single-restaurant-categorytype">
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
