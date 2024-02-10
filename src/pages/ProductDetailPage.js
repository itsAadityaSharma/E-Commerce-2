import React from "react";
import ProductDetail from "../features/product/component/ProductDetails";
import Navbar from "../features/Navbar/Navbar";

const ProductDetailPage = () => {
  return (
    <>
      <Navbar>
        <ProductDetail></ProductDetail>
      </Navbar>
    </>
  );
};

export default ProductDetailPage;
