import { useContext } from "react";
import SubjectsList from "/src/components/subjects/SubjectsList";
import CourseCardList from "/src/components/course/course-card-list";
import CourseContext from "/src/context/courseContext";
import { AssignmentsData } from "/src/helpers/assignments";

function Assignments() {
  return (
    <>
      <SubjectsList />

      <h2 className="text-2xl font-bold lg:text-3xl my-6">Assignments</h2>
      <div className="my-5">
        <CourseCardList tests={AssignmentsData} isTest={false} />
      </div>
    </>
  );
}

export default Assignments;
