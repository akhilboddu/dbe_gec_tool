import { useContext } from "react";

import { useQuery } from "react-query";
import Info from "../components/shared/info";
import CourseContext from "../context/courseContext";

import CourseCardList from "/src/components/course/course-card-list";
import Error from "/src/components/shared/error";
import Loading from "/src/components/shared/loading";

import { Link } from "@tanstack/react-location";

import { QueryKeys } from "/src/constants/query-keys";
import { getCoursesApi } from "/src/helpers/fetchers";

export default function Home() {
  const courseCtx = useContext(CourseContext);
  const { arrTest } = courseCtx;

  // query
  const coursesQuery = useQuery([QueryKeys.COURSES], getCoursesApi);

  return (
    <div className="space-y-4 lg:space-y-8">
      <h2 className="text-2xl font-bold lg:text-3xl">Welcome Learner</h2>

      <Info
        text={"You are upto date with all your assignments. Great stuff!"}
      />
      {/* 
      {coursesQuery.isLoading ? (
        <Loading />
      ) : coursesQuery.isError ? (
        <Error text={coursesQuery.error.response.data?.message} />
      ) : (
        <CourseCardList courses={coursesQuery.data} />
      )} */}

      <div className="flex">
        <div className="card card-bordered ml-4 w-2/6 bg-base-300 lg:aspect-2/1">
          <div className="card-body">
            <h3 className="card-title">Tests</h3>

            <div className="lg:relative lg:flex-1">
              <p className="lg:absolute lg:inset-0 lg:overflow-hidden">{}</p>
            </div>

            <div className="card-actions justify-end">
              <Link to={`/tests`} className="btn border-none bg-mainColor">
                View now
              </Link>
            </div>
          </div>
        </div>

        <div className="card card-bordered ml-4 w-2/6 bg-base-300 lg:aspect-2/1">
          <div className="card-body">
            <h3 className="card-title">Grades</h3>

            <div className="lg:relative lg:flex-1">
              <p className="lg:absolute lg:inset-0 lg:overflow-hidden">{}</p>
            </div>

            <div className="card-actions justify-end">
              <Link to={`/grades`} className="btn border-none bg-mainColor">
                View now
              </Link>
            </div>
          </div>
        </div>

        <div className="card card-bordered ml-4 w-2/6 bg-base-300 lg:aspect-2/1">
          <div className="card-body">
            <h3 className="card-title">Assignments</h3>

            <div className="lg:relative lg:flex-1">
              <p className="lg:absolute lg:inset-0 lg:overflow-hidden">{}</p>
            </div>

            <div className="card-actions justify-end">
              <Link
                to={`/assignments`}
                className="btn border-none bg-mainColor"
              >
                View now
              </Link>
            </div>
          </div>
        </div>

        <div className="card card-bordered ml-4 w-2/6 bg-base-300 lg:aspect-2/1">
          <div className="card-body">
            <h3 className="card-title">Profile</h3>

            <div className="lg:relative lg:flex-1">
              <p className="lg:absolute lg:inset-0 lg:overflow-hidden">{}</p>
            </div>

            <div className="card-actions justify-end">
              <Link to={`/user`} className="btn border-none bg-mainColor">
                View now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
