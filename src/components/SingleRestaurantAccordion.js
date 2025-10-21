import { useState } from "react";
import Itemlist from "./Itemlist";

const SingleRestaurantAccordion = ({ name, data }) => {
  const [showaccordian, setShowaccordian] = useState(false);

  const handleToogle = () => {
    setShowaccordian(!showaccordian);
  };

  return (
    <div className="flex flex-col gap-4 margin-auto justify-center">
      <div className="bg-primarywhite text-primaryblack border-2 border-gray-300 text-xl rounded-xl hover:border-accentlight transition">
        <div
          onClick={handleToogle}
          className="border-b-1 border-gray-300 px-4 py-4 flex justify-between items-center font-medium cursor-pointer"
        >
          <div className="flex gap-1 items-center justify-start">
            <p>{name.charAt(0).toUpperCase() + name.slice(1)}</p>{" "}
            <span>({data.length})</span>
          </div>
          <span>▼</span>
        </div>
        {showaccordian && (
          <div className="p-4">
            <Itemlist data={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleRestaurantAccordion;
