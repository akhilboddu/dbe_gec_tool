import React, { useEffect } from "react";
import { db } from "/src/firebase";
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import Loading from "/src/components/shared/loading";

function AssignmentList() {
  const [results, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);
  
  const fetchAllData = async () => {
    try {
      const dataArray = [];
      const qry = query(collection(db, "assignments"));
      const querySnapshot = await getDocs(qry);
      querySnapshot.forEach((doc) => {
        dataArray.push({ ...doc.data(), id: doc.id });
      });
      setResult(dataArray);
      setLoading(false);
    } catch (e) {
      console.error("Error fetching document: ", e);
      setLoading(false);
    }
  };

  const deleteAssignment = async (id) => {
    await deleteDoc(doc(db, "assignments", id));
    fetchAllData();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="my-6 overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr>
                <th className="text-center">Sr. No</th>
                <th className="text-center">Title</th>
                <th className="text-center">Deadline</th>
                <th className="text-center">Total Marks</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {results?.map((result, index) => (
                <tr key={index}>
                  {/* index */}
                  <th className="text-center" style={{ zIndex: 0 }}>{index + 1}</th>
                  {/* Title */}
                  <td className="text-center">{result.title}</td>
                  {/* Deadline */}
                  <td className="text-center">{result.deadline}</td>
                  {/* Total Marks */}
                  <td className="text-center">{result.totalMarks}</td>
                  <td className="text-end">{
                    <button
                      className="btn bg-red-600"
                      onClick={() => deleteAssignment(result.assignmentId)}
                    >
                      Delete
                    </button>
                  }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default AssignmentList;
