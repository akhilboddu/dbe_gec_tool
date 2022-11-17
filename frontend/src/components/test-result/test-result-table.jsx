import dayjs from "dayjs";

export default function TestResultTable({ testResults }) {

  
  return (
    <div className="overflow-x-auto">
      <table className="table-zebra table w-full">
        <thead>
          <tr>
            <th />
            <th>Full Name</th>
            <th>School Name</th>
            <th>Grade Name</th>
            <th>Score</th>
            <th>Test ID</th>
          </tr>
        </thead>

        <tbody>
          {testResults.map((testResult, index) => (
            <tr key={index}>
              {/* index */}
              <th>{index + 1}</th>
              {/* full name */}
              <td>{testResult.full_name}</td>
              {/* school name */}
              <td>{testResult.school_name}</td>
              {/* class name */}
              <td>{testResult.Grade}</td>
              {/* score */}
              <td>{testResult.score}</td>
              {/* Test */}
              <td>{testResult.test}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
