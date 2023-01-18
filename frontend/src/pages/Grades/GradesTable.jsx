import React from "react";
import { Link } from "@tanstack/react-location";

function GradesTable({ result, teacherId }) {
  console.log("table", result);

  const renderButton = (tResult) => {
    if (tResult.status === "evaluated") {
      return (
        <Link
          to={`/result/${tResult.test}/${tResult.attemptId}`}
          className="btn btn-mainColor"
        >
          View
        </Link>
      );
    } else {
      if (!teacherId) {
        return (
          <Link
            to={`/result/${tResult.test}/${tResult.attemptId}`}
            className="btn btn-mainColor"
          >
            View
          </Link>
        );
      } else {
        return (
          <Link
            to={`/result/${tResult.test}/${tResult.attemptId}/${tResult.id}/${teacherId}`}
            className="btn"
          >
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
            <th />
            <th>Subject</th>
            <th>Date</th>
            {/* <th>Term</th> */}
            <th>Mark</th>

            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {result?.map((testResult, index) => (
            <tr key={index}>
              {/* index */}
              <th>{index + 1}</th>
              {/* full name */}
              <td>{testResult.subject}</td>
              {/* school name */}
              <td>{testResult.date}</td>
              {/* class name */}
              {/* <td>{testResult.Term}</td> */}
              {/* score */}
              <td>{testResult.score}</td>
              {/* Test */}
              {/* <td>{testResult.Grade}</td> */}
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
