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
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { useEffect } from "react";

export default function Home() {
  const courseCtx = useContext(CourseContext);
  const { arrTest } = courseCtx;

  // query
  const coursesQuery = useQuery([QueryKeys.COURSES], getCoursesApi);

  return (
    <>
      {arrTest ? (
        <div className="space-y-4 lg:space-y-8">
          <h2 className="text-2xl font-bold lg:text-3xl">Welcome Learner</h2>

          <Info
            text={"You are upto date with all your assignments. Great stuff!"}
          />

          <div className="flex">
            <div className="w-2/6 ml-4 card card-bordered bg-base-300 lg:aspect-2/1">
              <div className="card-body">
                <h3 className="card-title">Tests</h3>

                <div className="lg:relative lg:flex-1">
                  <p className="lg:absolute lg:inset-0 lg:overflow-hidden">
                    {}
                  </p>
                </div>

                <div className="justify-end card-actions">
                  <Link to={`/student/tests/`} className="border-none btn bg-mainColor">
                    View now
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-2/6 ml-4 card card-bordered bg-base-300 lg:aspect-2/1">
              <div className="card-body">
                <h3 className="card-title">Grades</h3>

                <div className="lg:relative lg:flex-1">
                  <p className="lg:absolute lg:inset-0 lg:overflow-hidden">
                    {}
                  </p>
                </div>

                <div className="justify-end card-actions">
                  <Link to={`/student/grades`} className="border-none btn bg-mainColor">
                    View now
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-2/6 ml-4 card card-bordered bg-base-300 lg:aspect-2/1">
              <div className="card-body">
                <h3 className="card-title">Assignments</h3>

                <div className="lg:relative lg:flex-1">
                  <p className="lg:absolute lg:inset-0 lg:overflow-hidden">
                    {}
                  </p>
                </div>

                <div className="justify-end card-actions">
                  <Link
                    to={`/student/assignments`}
                    className="border-none btn bg-mainColor"
                  >
                    View now
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-2/6 ml-4 card card-bordered bg-base-300 lg:aspect-2/1">
              <div className="card-body">
                <h3 className="card-title">Profile</h3>

                <div className="lg:relative lg:flex-1">
                  <p className="lg:absolute lg:inset-0 lg:overflow-hidden">
                    {}
                  </p>
                </div>

                <div className="justify-end card-actions">
                  <Link to={`/user`} className="border-none btn bg-mainColor">
                    View now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
