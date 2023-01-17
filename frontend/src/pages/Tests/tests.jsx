import React, { useState,useEffect } from "react";
import { useQuery } from "react-query";
import { QueryKeys } from "/src/constants/query-keys";
import { getCoursesApi } from "/src/helpers/fetchers";
import Error from "/src/components/shared/error";
import Loading from "/src/components/shared/loading";

import CourseContext from "/src/context/courseContext";
import { useContext } from "react";
import CourseCardList from "/src/components/course/course-card-list";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "/src/firebase";

function tests() {
  // const courseCtx = useContext(CourseContext);
  // const { arrTest } = courseCtx;

  const arrTest = []
  const [testIndex,setTestIndex] = useState()


  useEffect(()=>{
    getTest()
  },[])

  const getTest= async()=>{
      
    const docSnap = await getDocs(collection(db,"test"))

    docSnap.forEach(doc => {
      console.log(doc.data())
     arrTest.push(doc.data())
    });

    }
  
  

  return (
    arrTest ? (<div className="space-y-4 lg:space-y-8">
      <h2 className="text-2xl font-bold lg:text-3xl">Tests</h2>
     

      <CourseCardList tests={arrTest} />
    </div>
  ) : <Loading/>
  )
  }
export default tests;
