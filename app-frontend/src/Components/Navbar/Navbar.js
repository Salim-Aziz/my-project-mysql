import "./Navbar.css";
// import { TfiShoppingCart } from "react-icons/tfi";
// import logo from "../../Images/logo.jpg";
import cart from "../../Images/cart.png";
import { Link } from "react-router-dom";
import logo from "../../Images/logo3.png";
import { useCart } from "../Cart/cartContext";

const Navbar = () => {
  const { cart: cartItems } = useCart();

  return (
    <>
      <div className="header">
        <div className="logo">
          <Link
            style={{
              textDecoration: "none",
              color: "black",
              // fontFamily: "Bowlby One SC",
              fontFamily: "Rubik Vinyl",
            }}
            to="/"
          >
            {" "}
            <img src={logo} alt="" />
          </Link>{" "}
        </div>
        <div className="cart-signup">
          <Link to="/SignUp"> {/* <button>SignUp</button> */}</Link>
          <Link to="/Cart">
            {/* {" "} */}
            <img src={cart} alt="" />
          </Link>

          <Link to="/Cart" style={{ textDecoration: "none" }}>
            {/* {" "} */}
            <div className="cart-count">{cartItems.length}</div>
          </Link>
          {/* <TfiShoppingCart style={{ fontSize: "42px" }} /> */}

        </div>
      </div>
    </>
  );
};

export default Navbar;
