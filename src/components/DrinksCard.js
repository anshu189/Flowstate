const DrinksCard = (props) => {
  const { name, image, rating, prepTimeMinutes, mealType } = props.data;

  return (
    <div className="single-drinkcard-container">
      <div
        style={{
          backgroundImage: `url("${image}")`,
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
        <p className="drinkcard-rating">
          Rating: <span className="dcd">{rating}</span>
        </p>
        <p className="drinkcard-price">
          Prepare Time: <span className="dcd">{prepTimeMinutes}</span>
        </p>
        <p className="drinkcard-delivery">
          Meal Type: <span className="dcd">{mealType.join(", ")}</span>
        </p>
      </div>
    </div>
  );
};

export default DrinksCard;
