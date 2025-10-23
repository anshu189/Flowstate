import { useSelector } from "react-redux";

const CartPage = () => {
  const cartItems2 = useSelector((store) => store.cart.items);
  console.log(cartItems2);
  return (
    <div className="min-h-[100vh]">
      {cartItems2.map((item) => {
        <p className="text-primaryblack">{item}</p>;
      })}
    </div>
  );
};

export default CartPage;
