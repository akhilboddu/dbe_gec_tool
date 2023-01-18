import React, { useEffect } from "react";
import GradesTable from "./GradesTable";
import Info from "/src/components/shared/info";
import SubjectsList from "/src/components/subjects/SubjectsList";
import { auth, db } from "/src/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useState } from "react";
import Loading from "/src/components/shared/loading";
import { useMatch } from "@tanstack/react-location";

function grades() {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState("all");

  const {
    params: { teacherId },
  } = useMatch();
  console.log(teacherId);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const dataArray = [];
        const q = query(collection(db, "grades"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          dataArray.push({ ...doc.data(), id: doc.id });
        });
        setResult(dataArray);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching document: ", e);
        setLoading(false);
      }
    };

    const fetchByStudentId = async () => {
      try {
        const dataArray = [];
        const q = query(
          collection(db, "grades"),
          where("student", "==", auth.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          dataArray.push({ ...doc.data(), id: doc.id });
        });
        setResult(dataArray);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching document: ", e);
        setLoading(false);
      }
    };

    if (teacherId) {
      fetchAllData();
    } else {
      fetchByStudentId();
    }
  }, []);

  const filterData = (sub) => {
    setSelectedSubject(sub);
  };

  const getResult = () => {
    if (selectedSubject == "all") {
      return result;
    } else {
      const filteredData = result.filter(
        (d) =>
          d.subject.toUpperCase().includes(selectedSubject.toUpperCase()) ==
          true
      );
      return filteredData;
    }
  };

  return (
    <>
      <SubjectsList fromGrades filterData={filterData} />
      <div className="my-5">
        <Info text="Grades can be synced with SA-SAMS or displayed in tabular format here." />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <GradesTable result={getResult()} teacherId={teacherId} />
      )}
    </>
  );
}

export default grades;
