import React from "react";
import Navbar from "../features/Navbar/Navbar";
import ProductList from "../features/product/component/ProductList";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar>
        <ProductList></ProductList>
      </Navbar>
    </div>
  );
};

export default Home;
