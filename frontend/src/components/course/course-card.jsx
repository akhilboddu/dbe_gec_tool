import { useNavigate, useLocation } from "@tanstack/react-location";
import React from "react";

export default function CourseCard({ test, isTest }) {
  const currentLocation = useLocation()

  const currentPath = currentLocation.current.pathname
  const navigate = useNavigate();

  const handleBtnClick = () => {
    navigate({ to: currentPath.endsWith("teacher") ? `/${test.testId}/teacher` : `/${test.testId}`, replace: true })

  }

  return (
    <div className="w-full card card-bordered bg-base-300 lg:aspect-2/1">
      <div className="card-body">
        <h3 className="card-title">{test.title}</h3>

        <div className="lg:relative lg:flex-1">
          <p className="lg:absolute lg:inset-0 lg:overflow-hidden">
            {test.description}
          </p>
        </div>

        <div className="justify-between items-center card-actions">
          <div className="">Total Marks: {test.totalMarks}</div>

          <div className="justify-end">
            <div className="btn-mainColor btn mr-5">{test.duration}</div>

            <div onClick={handleBtnClick} className="btn">
              {isTest ? "Take Test" : "View Assignment"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
