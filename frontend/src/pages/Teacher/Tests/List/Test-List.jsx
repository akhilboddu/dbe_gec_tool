import React, { useEffect } from "react";
import { db } from "/src/firebase";
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import Loading from "/src/components/shared/loading";
import { useNavigate } from "@tanstack/react-location";

function TestList() {
  const navigate = useNavigate();
  const [results, setResult] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const dataArray = [];
      const qry = query(collection(db, "test"));
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

  const deleteTest = async (id) => {
    await deleteDoc(doc(db, "test", id));
    fetchAllData();
  };
  console.log("results ::", results);
  const updateTest = async (testId) => {
    navigate({ to: `/dashboard/update-test/teacher/${testId}` })
  }

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
                <th className="text-center">Duration</th>
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
                  {/* Duration */}
                  <td className="text-center">{result.duration}</td>
                  {/* Total Marks */}
                  <td className="text-center">{result.totalMarks}</td>
                  <td className="text-end">{<div className="flex justify-end">
                    <button
                      className="btn bg-green-600 mr-5"
                      onClick={() => updateTest(result.testId)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn bg-red-600"
                      onClick={() => deleteTest(result.testId)}
                    >
                      Delete
                    </button>
                  </div>
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

export default TestList;
