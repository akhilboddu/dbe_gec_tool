import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "../components/shared/loading";
import Rankings from "./rankings";

export default function UserInfo() {
  const [userData, setUserData] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const getUserData = async () => {
    let collection = "";
    if (user.role == "teacher") collection = "teachers";
    else collection = "users";

    const docRef = doc(db, collection, auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    console.log("Student: ",docSnap.data())

    setUserData(docSnap.data());
  };

  getUserData();
  return (
    <div className="space-y-4">
      {userData ? (
        <>
          <div className="mb-8 text-2xl">
            <div>
              <span className="font-bold">Profile:</span> {userData.full_name}
            </div>
            <div className="badge">{auth.currentUser.email}</div>
          </div>

          <div>
            <span className="font-bold">Email:</span> {userData.email}
          </div>

          <div>
            <span className="font-bold">School Name:</span>{" "}
            {userData.school_name}
          </div>

          <div>
            <span className="font-bold">EMIS Number:</span>{" "}
            {userData.emis_number}
          </div>

          <div>
            <span className="font-bold">Class Name:</span> {userData.class_name}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
