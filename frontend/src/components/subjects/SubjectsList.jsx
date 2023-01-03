import Subject from "./Subject";

function SubjectsList({ fromGrades = false }) {
  const subjects = [
    { name: "Mathematics" },
    { name: "Social Sciences - Geography" },
    { name: "Social Sciences - History" },
    { name: "Life Orientation" },
    { name: "Economic Management Sciences" },
    { name: "Creative Arts" },
    { name: "Technology" },
  ];
  return (
    <>
      {subjects.map((subject) => (
        <Subject subjectName={subject.name} fromGrades={fromGrades} />
      ))}
    </>
  );
}

export default SubjectsList;
