import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser, signOutAsync } from "../AuthSlice";

const LogOut = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    dispatch(signOutAsync());
  });
  return <>{!user && <Navigate to="/" replace={true}></Navigate>}</>;
};

export default LogOut;
