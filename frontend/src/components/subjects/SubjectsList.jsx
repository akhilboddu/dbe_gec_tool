import Subject from "./Subject";

function SubjectsList({ fromGrades = false , filterData, subjectList}) {
  const subjects = [
    { name: "All" },
    { name: "Mathematics" },
    { name: "English" },
    { name: "Social Sciences - Geography" },
    { name: "Social Sciences - History" },
    { name: "Life Orientation" },
    { name: "Economic Management Sciences" },
    { name: "Creative Arts" },
    { name: "Technology" },
  ];


  return (
    <>
      {subjectList.map((subject, index) => (
        <Subject key={index} subjectName={subject.name} fromGrades={fromGrades} onChange={filterData} />
      ))}
    </>
  );
}

export default SubjectsList;
