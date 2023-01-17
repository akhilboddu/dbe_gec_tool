import React from "react";
import { Link } from "@tanstack/react-location";


function GradesTable({result}) {
  console.log("table", result);
  const teacherId = "jhasdk";
  const testResults = [
    {
      Subject: "Mathematics",
      Task: "Assignment 1",
      Term: "1",
      Mark: "44/50",

      Weighting: "16%",
    },
    {
      Subject: "Mathematics",
      Task: "Assignment 1",
      Term: "1",
      Mark: "44/50",

      Weighting: "16%",
    },
    {
      Subject: "Mathematics",
      Task: "Assignment 1",
      Term: "1",
      Mark: "44/50",

      Weighting: "16%",
    },

    {
      Subject: "Mathematics",
      Task: "Assignment 1",
      Term: "1",
      Mark: "44/50",

      Weighting: "16%",
    },
    {
      Subject: "Mathematics",
      Task: "Assignment 1",
      Term: "1",
      Mark: "44/50",

      Weighting: "16%",
    },
    {
      Subject: "Mathematics",
      Task: "Assignment 1",
      Term: "1",
      Mark: "44/50",

      Weighting: "16%",
    },
    
  ];

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
            <tr key={index} >
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
              <td>{testResult.status === "evaluationPending" ? "Evaluation Pending" : "Evaluated"}</td>
              <td>
              <Link to={testResult.status === "evaluationPending" ? `/result/${testResult.test}/${testResult.attemptId}/${testResult.id}/${teacherId}`: `/result/${testResult.test}/${testResult.attemptId}`} className="btn">
                  View
              </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GradesTable;
