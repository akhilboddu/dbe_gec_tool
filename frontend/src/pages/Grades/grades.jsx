import React from "react";
import GradesTable from "./GradesTable";
import Info from "/src/components/shared/info";
import SubjectsList from "/src/components/subjects/SubjectsList";

function grades() {
  return (
    <>
      <SubjectsList fromGrades />
      <div className="my-5">
        <Info text="Grades can be synced with SA-SAMS or displayed in tabular format here." />
      </div>
      <GradesTable />
    </>
  );
}

export default grades;
