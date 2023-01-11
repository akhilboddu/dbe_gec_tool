import { Navigate } from "@tanstack/react-location";
// import { useAtom } from "jotai";

// import { userAtom } from "/src/stores/auth.store";

// export default function CheckLogin({ children }) {
//   // atom
//   const [user] = useAtom(userAtom);

//   return !user?.token ? <Navigate to="/login" replace /> : children;
// }


import React from "react"
import { auth } from "/src/firebase"


const CheckLogin =({children})=>{
  
  const currentUser = auth.currentUser

  return(
    currentUser ? children : <Navigate to="/login/" replace />
  )
  
}

export default CheckLogin