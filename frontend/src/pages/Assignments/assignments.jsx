import { useState, useEffect } from "react";
import { db } from "/src/firebase";
import { collection, getDocs } from "firebase/firestore";
import AssignmentCardList from "./components/Assignment-Card-List";

function Assignments() {
  const [assignments, setAssignment] = useState([]);

  const fetchAssignments = async () => {

    const querySnapshot = await getDocs(collection(db, "assignments"));
    querySnapshot.forEach((doc) => {
      setAssignment((prev) => [...prev, doc.data()])
    });
  }

  useEffect(() => {
    fetchAssignments()
  }, [])

  return (
    <>
      {/* <SubjectsList /> */}

      <h2 className="text-2xl font-bold lg:text-3xl my-6">Assignments</h2>
      <div className="my-5">
        <AssignmentCardList assignments={assignments} />
      </div>
    </>
  );
}

export default Assignments;
