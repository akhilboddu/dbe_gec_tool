import AssignmentCard from "./Assignment-Card";
import Info from "/src/components/shared/info";

export default function AssignmentCardList({ assignments }) {
  console.log("Data: ",assignments)
  return assignments.length > 0 ? (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-8 lg:px-8 xl:grid-cols-3">
      {assignments?.map((assignment) => (
        <AssignmentCard assignment={assignment} key={assignments.assignmentId} />
      ))}
    </div>
  ) : (
    <Info text="No course" />
  );
}
