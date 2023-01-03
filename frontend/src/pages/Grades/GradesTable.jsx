import React from "react";

function GradesTable() {
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
      <table className="table-zebra table w-full">
        <thead>
          <tr>
            <th />
            <th>Subject</th>
            <th>Task</th>
            <th>Term</th>
            <th>Mark</th>

            <th>Weighting</th>
          </tr>
        </thead>

        <tbody>
          {testResults?.map((testResult, index) => (
            <tr key={index}>
              {/* index */}
              <th>{index + 1}</th>
              {/* full name */}
              <td>{testResult.Subject}</td>
              {/* school name */}
              <td>{testResult.Task}</td>
              {/* class name */}
              <td>{testResult.Term}</td>
              {/* score */}
              <td>{testResult.Mark}</td>
              {/* Test */}
              {/* <td>{testResult.Grade}</td> */}
              <td>{testResult.Weighting}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GradesTable;
