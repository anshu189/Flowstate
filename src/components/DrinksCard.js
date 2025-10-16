import { CDNIMG_URL } from "../utils/constants";

const DrinksCard = (props) => {
  const { name, cloudinaryImageId, costForTwo, avgRating, sla } =
    props.data.info;
  const imageURL = CDNIMG_URL + cloudinaryImageId;

  return (
    <div className="drinkcard-container">
      <div
        style={{
          backgroundImage: `url("${imageURL}")`,
          backgroundSize: "cover",
          backgroundPositionY: "center",
          backgroundRepeat: "no-repeat",
          height: "250px",
          width: "100%",
        }}
      ></div>
      <div className="drinkcard-details">
        <p className="drinkcard-name">
          <span className="dcd">{name}</span>
        </p>
        <p className="drinkcard-price">
          Price: <span className="dcd">{costForTwo}</span>
        </p>
        <p className="drinkcard-rating">
          Rating: <span className="dcd">{avgRating}</span>
        </p>
        <p className="drinkcard-delivery">
          Delivery: <span className="dcd">{sla.slaString}</span>
        </p>
      </div>
    </div>
  );
};

export default DrinksCard;
