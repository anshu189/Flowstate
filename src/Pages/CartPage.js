import { useDispatch, useSelector } from "react-redux";
import { cleanCart, removeItem } from "../store/cartSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const CartPage = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  const handleEmptyCart = () => {
    dispatch(cleanCart());
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/home");
    }
  }, [cartItems, navigate]);

  return (
    <div className="flex flex-col gap-8 py-12 pb-20 px-32">
      <div className="text-right">
        <button
          onClick={handleEmptyCart}
          className="px-3 py-2 font-semibold border-2 border-primaryblack rounded-md text-primarywhite bg-primaryblack transition-all duration-200 hover:bg-[#000000]"
        >
          Empty Cart
        </button>
      </div>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex justify-start items-center cursor-pointer gap-2 border-2 border-gray-200 rounded-lg overflow-hidden hover:border-accentdark duration-200"
        >
          <div className="flex items-center w-10/12">
            {/* Drink Image */}
            <div
              className="w-3/12 h-[200px] bg-center bg-no-repeat bg-cover"
              style={{ backgroundImage: `url("${item.image}")` }}
            ></div>
            {/* Drink Details */}
            <div className="flex flex-col gap-4 text-left text-xl font-semibold px-6">
              <p className="text-lg">
                <span className="font-semibold text-2xl text-accentdark">
                  {item.name}
                </span>
              </p>
              <p>
                Rating: <span className="font-normal">{item.rating}</span>
              </p>
              <p>
                Prepare Time:{" "}
                <span className="font-normal">{item.prepTimeMinutes} min</span>
              </p>
              <p>
                Meal Type:{" "}
                <span className="font-normal">{item.mealType.join(", ")}</span>
              </p>
            </div>
          </div>
          <div className="w-2/12 px-8 text-right">
            <button
              onClick={() => handleRemoveItem(item)}
              className="px-3 py-2 font-semibold border-2 border-primaryblack rounded-md text-primaryblack bg-primarywhite transition-all duration-200 hover:bg-primaryblack hover:text-primarywhite"
            >
              Remove Item
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartPage;
