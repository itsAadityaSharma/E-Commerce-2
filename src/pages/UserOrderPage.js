import React from "react";
import Navbar from "../features/Navbar/Navbar";
import UserOrder from "../features/user/components/UserOrder";

const UserOrderPage = () => {
  return (
    <div>
      <Navbar>
        <h1 className="mx-auto text-left text-4xl">My Orders</h1>
        <UserOrder></UserOrder>
      </Navbar>
    </div>
  );
};

export default UserOrderPage;
