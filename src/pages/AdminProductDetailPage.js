import React from "react";
import ProductDetail from "../features/product/component/ProductDetails";
import Navbar from "../features/Navbar/Navbar";
import { useParams } from "react-router-dom";
import AdminProductDetail from "../features/admin/component/AdminProductDetails";

const AdminProductDetailPage = () => {
  const { id } = useParams();
  return (
    <>
      <Navbar>
        <AdminProductDetail id={id}></AdminProductDetail>
      </Navbar>
    </>
  );
};

export default AdminProductDetailPage;
