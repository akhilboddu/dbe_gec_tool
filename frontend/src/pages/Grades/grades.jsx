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
  const [subjectList, setSubjectList] = useState([]);
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
        generateSubList(dataArray);
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
        const user = JSON.parse(localStorage.getItem("user"));
        const q = query(
          collection(db, "grades"),
          where("student", "==", user.id)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          dataArray.push({ ...doc.data(), id: doc.id });
        });
        generateSubList(dataArray);
        setResult(dataArray);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching document: ", e);
        setLoading(false);
      }
    };

    const generateSubList = (subjectData) => {
      let subList = [{ name: "All" }];
      console.log(subjectData, "subjectData");
      subjectData.forEach((sub) => {
        if (subList.findIndex((s) => s.name === sub.subject) == -1) {
          subList.push({ name: sub.subject });
        }
      });
      setSubjectList(subList);
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
        (d) => d.subject.toLowerCase() == selectedSubject.toLowerCase()
      );
      return filteredData;
    }
  };

  return (
    <>
      <SubjectsList
        fromGrades
        filterData={filterData}
        subjectList={subjectList}
      />
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
