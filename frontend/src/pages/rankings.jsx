import React, { useContext } from "react";
import { Link, useLocation } from "@tanstack/react-location";
import CourseContext from "../context/courseContext";

const rankings = () => {
  const ctxTest = useContext(CourseContext);
  const { arrTest } = ctxTest;

  const currentLocation = useLocation()

  const currentPath = currentLocation.current.pathname

  return (
    <>
      <h2 className="mb-5 text-2xl font-bold lg:text-3xl">Teachers View</h2>
      <div className="flex">
        {arrTest.map((test, index) => (
          <div
            className="card card-bordered ml-4 w-2/6 bg-base-300 lg:aspect-2/1"
            key={index}
          >
            <div className="card-body">
              <h3 className="card-title">{test.title}</h3>

              <div className="lg:relative lg:flex-1">
                <p className="lg:absolute lg:inset-0 lg:overflow-hidden">{}</p>
              </div>

              <div className="card-actions justify-end">
                <Link
                  to={currentPath.endsWith("teacher")?`/ranking/${test.testId}/teacher`:`/ranking/${test.testId}`}
                  className="btn border-none bg-mainColor"
                >
                  Ranking Page
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default rankings;
