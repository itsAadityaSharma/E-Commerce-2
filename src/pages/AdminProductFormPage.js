import React from "react";
import ProductForm from "../features/admin/component/ProductForm";
import Navbar from "../features/Navbar/Navbar";

const AdminProductFormPage = () => {
  return (
    <>
      <Navbar>
        <ProductForm></ProductForm>
      </Navbar>
    </>
  );
};

export default AdminProductFormPage;
