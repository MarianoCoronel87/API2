import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./cartWidget.css";
export const CartWidget = () => {
  return (
    <div>
      <Link to="/cart">
        <FaCartShopping />
      </Link>
    </div>
  );
};
