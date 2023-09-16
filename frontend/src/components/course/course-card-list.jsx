import CourseCard from "/src/components/course/course-card";
import Info from "/src/components/shared/info";

export default function CourseCardList({ tests, isTest = true }) {

  const user = JSON.parse(localStorage.getItem("user"));
  return tests.length > 0 ? (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-8 lg:px-8 xl:grid-cols-3">
      {tests?.filter(x => x.school_name == user?.school_name).map((test) => (
        <CourseCard test={test} key={test.testId} isTest={isTest} />
      ))}
    </div>
  ) : (
    <Info text="No course" />
  );
}
