const DrinksCard = (props) => {
  const { name, image, rating, prepTimeMinutes, mealType } = props.data;

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Drink Image */}
      <div
        className="w-full h-[250px] bg-center bg-no-repeat bg-cover rounded-md"
        style={{ backgroundImage: `url("${image}")` }}
      ></div>

      {/* Drink Details */}
      <div className="flex flex-col gap-2 text-left text-[18px] font-semibold px-6">
        <p className="text-lg">
          <span className="font-semibold text-2xl text-accentdark">{name}</span>
        </p>
        <p>
          Rating: <span className="font-normal">{rating}</span>
        </p>
        <p>
          Prepare Time: <span className="font-normal">{prepTimeMinutes}</span>
        </p>
        <p>
          Meal Type: <span className="font-normal">{mealType.join(", ")}</span>
        </p>
      </div>
    </div>
  );
};

export default DrinksCard;
