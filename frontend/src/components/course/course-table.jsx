import { Link } from "@tanstack/react-location";
import { useState } from "react";

import UpdateCourseModal from "/src/components/course/update-course-modal";

export default function CourseTable({ courses }) {
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const openUpdateModal = () => setIsUpdateModal(true);
  const closeUpdateModal = () => setIsUpdateModal(false);
  const editCourse = (courseId) => {
    openUpdateModal();
    setSelectedId(courseId);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-zebra table w-full">
          <thead>
            <tr>
              <th />
              <th>Actions</th>
              <th>Title</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course, index) => (
              <tr key={course._id}>
                <th>{index + 1}</th>
                <td className="space-x-2">
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => editCourse(index)}
                  >
                    Edit
                  </button>
                  <Link
                    to={`/admin/courses/${course._id}/lessons`}
                    className="btn btn-ghost btn-sm"
                  >
                    Lessons
                  </Link>
                </td>
                <td>{course.title}</td>
                <td>{course.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* update modal */}
      <UpdateCourseModal
        isModal={isUpdateModal}
        closeModal={closeUpdateModal}
        course={courses[selectedId]}
      />
    </>
  );
}
