import { useNavigate, useLocation } from "@tanstack/react-location";
import React from "react";

export default function AssignmentCard({ assignment }) {
  const currentLocation = useLocation()

  const currentPath = currentLocation.current.pathname
  const navigate = useNavigate();

  const handleBtnClick = () => {
    navigate({ to: currentPath.endsWith("teacher") ? `/teacher/${assignment.assignmentId}` : `/student/detail-assignment/${assignment.assignmentId}`, replace: true })
  }

  return (
    <div className="w-full card card-bordered bg-base-300 lg:aspect-2/1">
      <div className="card-body">
        <h3 className="card-title">{assignment.title}</h3>

        <div className="lg:relative lg:flex-1">
          <p className="lg:absolute lg:inset-0 lg:overflow-hidden">
            {assignment.description}
          </p>
        </div>

        <div className="justify-between items-center card-actions">
          <div className="flex flex-col">
            <div >Total Marks: {assignment.totalMarks}</div>
            {assignment.deadline && <div >Deadline: {assignment.deadline}</div>}
          </div>

          <div>
            <div onClick={handleBtnClick} className="btn">
              View Assignment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
