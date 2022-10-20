import {useContext} from "react"

import { useQuery } from "react-query";
import CourseContext from "../context/courseContext";

import CourseCardList from "/src/components/course/course-card-list";
import Error from "/src/components/shared/error";
import Loading from "/src/components/shared/loading";

import { QueryKeys } from "/src/constants/query-keys";
import { getCoursesApi } from "/src/helpers/fetchers";

export default function Home() {


  const courseCtx = useContext(CourseContext);
  const {arrTest} = courseCtx

 
  // query
  const coursesQuery = useQuery([QueryKeys.COURSES], getCoursesApi);

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
