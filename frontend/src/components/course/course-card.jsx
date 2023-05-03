import { Link,useNavigate, useLocation } from "@tanstack/react-location";
import React from "react";

export default function CourseCard({ test, isTest }) {

  const currentLocation = useLocation()

  const currentPath = currentLocation.current.pathname
  const navigate = useNavigate();

  const handleBtnClick=()=>{
    navigate({to: currentPath.endsWith("teacher")?`/${test.testId}/teacher`: `/${test.testId}`,replace: true})

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

        <div className="justify-end card-actions">
          <div className="btn-mainColor btn">{test.duration}</div>

          <div onClick={handleBtnClick} className="btn">
            {isTest ? "Take Test" : "View Assignment"}
          </div>
        </div>
      </div>
    </div>
  );
}
