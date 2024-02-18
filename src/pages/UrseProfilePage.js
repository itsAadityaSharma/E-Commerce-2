import React from "react";
import { UserProfile } from "../features/user/components/UserProfile";
import Navbar from "../features/Navbar/Navbar";

const UrseProfilePage = () => {
  return (
    <div>
      <Navbar>
        <h1 className="mx-auto text-left text-4xl">My Profile</h1>

        <UserProfile></UserProfile>
      </Navbar>
    </div>
  );
};

export default UrseProfilePage;
