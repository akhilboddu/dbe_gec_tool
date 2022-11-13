import {useState} from "react"
import { useMatch } from "@tanstack/react-location";
import { doc, getDoc } from "firebase/firestore";
import { useQuery } from "react-query";
import { db } from "../firebase";

import Error from "/src/components/shared/error";
import Loading from "/src/components/shared/loading";
import TestResultTable from "/src/components/test-result/test-result-table";

import { QueryKeys } from "/src/constants/query-keys";
import { getTestResultsByCourseApi } from "/src/helpers/fetchers";
import { useEffect } from "react";

export default function CourseLeaderboard() {
  // location
  const {
    params: { testId },
  } = useMatch();

    const [ranking, setRanking] = useState(null)


    useEffect(()=>{
      fetchRankings()
      
    },[])

    const fetchRankings= async()=>{

      const docRef = doc(db,"ranking",testId)
      const docSnap = await getDoc(docRef);

      if(docSnap){
        setRanking(docSnap.data().ranking)
      }else{
        console.log("No such document")
      }

    }

    
    
    
   
  return (
    <div className="space-y-4 lg:space-y-8">
      <div className="flex items-center gap-2 lg:gap-4">
        <button
          className="btn btn-mainColor"
          onClick={() => window.history.back()}
        >
          Back
        </button>
        <h2 className="text-2xl font-bold lg:text-3xl">Marks List</h2>
      </div>

      {!ranking? (
        <Loading />
      ) : (
        <TestResultTable testResults={ranking} />
      )}
    </div>
  );
}
