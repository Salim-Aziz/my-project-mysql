import React from "react";
import "./CardMainPage.css";
import { Link } from "react-router-dom";
import { useCart } from "../Cart/cartContext"; // Import the useCart hook

const CardMainPage = (props) => {
  const { addToCart } = useCart(); // Get addToCart function from context

  return (
    <>
      <div className="product-box">
        <Link style={{ textDecoration: "none" }} to={`/product/${props._id}`}>
          <img src={props.image} alt="" />
          <div className="discription">
            <h2>{props.name}</h2>
            <p className="price">
              {props.dis_price}
              <span>{props.price}</span>
            </p>
            <p className="para"></p>
          </div>
        </Link>
        {/* <Link to="/Cart">
          {" "} */}
        <button className="addtocart" onClick={() => addToCart(props)}>
          Add to Cart
        </button>
        {/* </Link> */}
      </div>
    </>
  );
};

export default CardMainPage;
