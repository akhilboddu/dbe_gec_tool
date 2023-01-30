import { Navigate } from "@tanstack/react-location";
import React from "react";
import { auth } from "/src/firebase";

const CheckLogin = ({ children }) => {
  const currentUser = auth.currentUser;
  const userLocal = localStorage.getItem("user");

  return userLocal ? children : <Navigate to="/login/" replace />;
};

export default CheckLogin;
