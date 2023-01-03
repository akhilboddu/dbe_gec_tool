import React from "react";
import { useQuery } from "react-query";
import { QueryKeys } from "/src/constants/query-keys";
import { getCoursesApi } from "/src/helpers/fetchers";
import Error from "/src/components/shared/error";
import Loading from "/src/components/shared/loading";

import CourseContext from "/src/context/courseContext";
import { useContext } from "react";
import CourseCardList from "/src/components/course/course-card-list";

function tests() {
  const courseCtx = useContext(CourseContext);
  const { arrTest } = courseCtx;
  // query
  // const { isLoading, isError, data } = useQuery(
  //   [QueryKeys.COURSES],
  //   getCoursesApi
  // );

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

      <CourseCardList tests={arrTest} />
    </div>
  );
}

export default tests;
