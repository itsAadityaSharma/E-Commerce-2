import React from "react";
import ProductDetail from "../features/product/component/ProductDetails";
import Navbar from "../features/Navbar/Navbar";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { id } = useParams();
  return (
    <>
      <Navbar>
        <ProductDetail id={id}></ProductDetail>
      </Navbar>
    </>
  );
};

export default ProductDetailPage;
