const Shimmer = () => {
  return (
    <div className="drinkcard-container shimmer-drinkcard-container">
      <div
        style={{
          backgroundColor: "#e4e4e4",
          height: "240px",
          width: "100%",
        }}
      ></div>
      <div className="drinkcard-details">
        <p className="drinkcard-name"></p>
        <p className="drinkcard-price"></p>
        <p className="drinkcard-rating"></p>
        <p className="drinkcard-delivery"></p>
      </div>
    </div>
  );
};

export default Shimmer;
