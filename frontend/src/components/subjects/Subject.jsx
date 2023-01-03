import React from "react";
import { useNavigate } from "@tanstack/react-location";

function Subject({ subjectName, fromGrades = false }) {
  const navigate = useNavigate();
  return (
    <div
      className="btn-mainColor btn m-1"
      onClick={() =>
        navigate({
          to: fromGrades ? "/grades" : "/assignments",
          search: {
            subject: `${subjectName.toLowerCase().trim().replaceAll(" ", "-")}`,
          },
          replace: false,
        })
      }
    >
      {subjectName}
    </div>
  );
}

export default Subject;
