import { useContext, useState, useEffect } from "react";
import SubjectsList from "/src/components/subjects/SubjectsList";
import CourseCardList from "/src/components/course/course-card-list";
import CourseContext from "/src/context/courseContext";
import { AssignmentsData } from "/src/helpers/assignments";
import { db } from "/src/firebase";
import { collection, getDocs } from "firebase/firestore";

function Assignments() {

  const [test, setTest] = useState([]);

  const fetchAssignments = async()=>{

    const querySnapshot =  await getDocs(collection(db, "assignments"));
     querySnapshot.forEach((doc) => {
      setTest((prev)=> [...prev,doc.data()])
      console.log(doc.data())
    });


  }

  useEffect(()=>{
    fetchAssignments()
  },[])

  return (
    <>
      <SubjectsList />

      <h2 className="text-2xl font-bold lg:text-3xl my-6">Assignments</h2>
      <div className="my-5">
        <CourseCardList tests={test} isTest={false} />
      </div>
    </>
  );
}

export default Assignments;
