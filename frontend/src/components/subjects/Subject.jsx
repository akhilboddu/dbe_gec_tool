import React from "react";
import { useNavigate } from "@tanstack/react-location";

function Subject({ subjectName, fromGrades = false, onChange }) {
  const navigate = useNavigate();
  return (
    <div
      className="m-1 btn-mainColor btn"
      onClick={() =>
        {
        // navigate({
        //   to: fromGrades ? "/grades" : "/assignments",
        //   search: {
        //     subject: `${subjectName.toLowerCase().trim().replaceAll(" ", "-")}`,
        //   },
        //   replace: false,
        // })
        onChange(`${subjectName.toLowerCase().trim()}`)
      }
      }
    >
      {subjectName}
    </div>
  );
}

export default Subject;
