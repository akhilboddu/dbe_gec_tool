import React from "react";
import { Link } from "@tanstack/react-location";

function GradesTable({ result, teacherId }) {
  /* console.log("table", result);
  console.log("teacherId", teacherId); */

  const renderButton = (tResult) => {

    if (tResult.status === "evaluated") {
      return (
        <Link
          to={`/result/${tResult.test ? tResult.test: tResult.assignment}/${tResult.attemptId}`}
          className="btn-mainColor btn"
        >
          {/* {console.log("tResult :: evaluated ::", tResult.assignment)} */}
          View
        </Link>
      );
    } else {
      if (!teacherId) {
        return (
          <Link
            to={`/result/${tResult.test ? tResult.test: tResult.assignment}/${tResult.attemptId}`}
            className="btn-mainColor btn"
          >
            {console.log("tResult :: !teacherId ::", tResult.assignment)}
            View
          </Link>
        );
      } else {
        return (
          <Link
            to={`/teacher/result/${tResult.test ? tResult.test: tResult.assignment }/${tResult.attemptId}/${tResult.id}/${teacherId}`}
            className="btn"
          >
            {console.log("tResult :: ELSE ::", tResult.assignment)}
            Evaluate
          </Link>
        );
      }
    }
  };

  return (
    <div className="my-6 overflow-x-auto">
      <table className="table w-full table-zebra">
        <thead>
          <tr>
            <th style={{ zIndex: 0 }} />
            <th>Subject</th>
            <th>Date</th>
            <th>Mark</th>
            <th>Percentage</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {result?.map((testResult, index) => (
            <tr key={index}>
              {/* index */}
              <th style={{ zIndex: 0 }}>{index + 1}</th>
              {/* Subject */}
              <td>{testResult.subject}</td>
              {/* test date */}
              <td>{testResult.date}</td>
              {/* score */}
              <td>{testResult.totalMarks ? `${testResult.score}/${testResult.totalMarks}` : testResult.score}</td>
              {/* Percentage */}
              <td>{testResult?.percentage ? `${testResult?.percentage}%` : ''} </td>
              {/* Status */}
              <td>
                {testResult.status === "evaluationPending"
                  ? "Evaluation Pending"
                  : "Evaluated"}
              </td>
              <td>{renderButton(testResult)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GradesTable;
