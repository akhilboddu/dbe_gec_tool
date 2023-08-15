import { Outlet,useNavigate } from "@tanstack/react-location";
import NoAccess from "../no-access";
import { auth, getUserProfile,logout } from "/src/firebase";
import React, { useEffect, useState } from "react";
import Loading from "/src/components/shared/loading";

export default function ProtectedTeacherLayout() {
  // location
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;
  const userLocal = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Check authentication state whenever the component mounts
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        getUserProfile("teachers", userLocal.id).then(data=>{
          if(data){
            setLoading(false);
          }else{
            logout(navigate)
            return <NoAccess />;
          }
          //console.log("User1: ",data);
        })
      } else {
        logout(navigate)
      }
    });

    return () => {
      unsubscribe(); // Cleanup on unmount
    };
  }, []);

  if(loading) return <Loading />;

  /* if (userLocal?.role?.toLowerCase() !== "teacher") {
    return <NoAccess />;
  } */
  return <Outlet />;
}
