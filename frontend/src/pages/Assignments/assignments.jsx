import { useState, useEffect } from "react";
import { db } from "/src/firebase";
import { collection, getDocs } from "firebase/firestore";
import AssignmentCardList from "./components/Assignment-Card-List";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  
  const fetchAssignments = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let dataArray = [];

    const querySnapshot = await getDocs(collection(db, "assignments"));
    querySnapshot.forEach((doc) => {
      dataArray.push(doc.data());
    });
    setAssignments(dataArray.filter(x => x.school_name == user?.school_name));
    console.log("querySnapshot :: ", querySnapshot);
  }

  useEffect(() => {
    fetchAssignments()
  }, [])

  return (
    <>
      {console.log("assignments :: ", assignments)}

      <h2 className="text-2xl font-bold lg:text-3xl my-6">Assignments</h2>
      <div className="my-5">
        <AssignmentCardList assignments={assignments} />
      </div>
    </>
  );
}

export default Assignments;
