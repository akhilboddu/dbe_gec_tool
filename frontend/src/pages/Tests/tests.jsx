import React from "react";
import { useQuery } from "react-query";
import { QueryKeys } from "/src/constants/query-keys";
import { getCoursesApi } from "/src/helpers/fetchers";
import Error from "/src/components/shared/error";
import Loading from "/src/components/shared/loading";

import CourseContext from "/src/context/courseContext";
import { useContext } from "react";
import CourseCardList from "/src/components/course/course-card-list";
import { db } from "/src/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useState } from "react";

function tests() {
  const courseCtx = useContext(CourseContext);
  const { arrTest } = courseCtx;
  const [test, setTest] = useState([]);
  const [loading, setLoading] = useState(true);

  // query
  // const { isLoading, isError, data } = useQuery(
  //   [QueryKeys.COURSES],
  //   getCoursesApi
  // );

  useEffect(() => {
    const dataFetch = async () => {
      try {
        let dataArray = [];
        const querySnapshot = await getDocs(collection(db, "test"));
        querySnapshot.forEach((doc) => {
          dataArray.push(doc.data());
        });
        setTest(dataArray);
        setLoading(false);
        console.log("test", test);
      } catch (e) {
        console.error("Nothing found ", e);
        setLoading(false);
      }
    };

    dataFetch();
  }, []);

  return (
    <div className="space-y-4 lg:space-y-8">
      <h2 className="text-2xl font-bold lg:text-3xl">Tests</h2>
      {/* 
      {coursesQuery.isLoading ? (
        <Loading />
      ) : coursesQuery.isError ? (
        <Error text={coursesQuery.error.response.data?.message} />
      ) : (
        <CourseCardList courses={coursesQuery.data} />
      )} */}
      {loading ? <Loading /> : <CourseCardList tests={test} />}
    </div>
  );
}

export default tests;
