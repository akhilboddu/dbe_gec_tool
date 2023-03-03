import React, { useState,useEffect } from "react";
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

function tests() {
  // const courseCtx = useContext(CourseContext);
  // const { arrTest } = courseCtx;
  const [test, setTest] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const dataFetch = async () => {
      try {
        let dataArray = [];
        const querySnapshot = await getDocs(collection(db, "test"));
        querySnapshot.forEach((doc) => {
          dataArray.push(doc.data());
        });
        console.log("dataArray", dataArray);

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
    test ? (<div className="space-y-4 lg:space-y-8">
      <h2 className="text-2xl font-bold lg:text-3xl">Tests</h2>
      {loading ? <Loading /> : <CourseCardList tests={test} />}
    </div>
  ) : <Loading/>
  )
  }
export default tests;
