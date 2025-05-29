// import "./Card.css";
import React from "react";
import { useEffect, useState } from "react";
import CardMainPage from "./CardMainPage";
export const Card = ({ products }) => {
  console.log("these are product coming from Card.js file:", products);
  return (
    <>
      <div className="product_heading"> PRODUCTS </div>
      <div className="product">
        {products.map((product) => (
          <CardMainPage
            key={product.id}
            _id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </>
  );
};

export default Card;
