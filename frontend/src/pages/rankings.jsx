import React, {useContext} from "react";
import { Link } from "@tanstack/react-location";
import CourseContext from "../context/courseContext";

const rankings =()=>{

    const ctxTest = useContext(CourseContext)
    const {arrTest} = ctxTest

    return(
        <>
        <h2 className="text-2xl font-bold lg:text-3xl mb-5">Rankings</h2>
        <div className="flex">
        {arrTest.map((test,index)=>(
            <div className="card card-bordered w-2/6 bg-base-300 lg:aspect-2/1 ml-4" key={index}>
            <div className="card-body">
              <h3 className="card-title">{test.Title}</h3>
      
              <div className="lg:relative lg:flex-1">
                <p className="lg:absolute lg:inset-0 lg:overflow-hidden">
                  {}
                </p>
              </div>
      
              
              <div className="card-actions justify-end">
                
                <Link to={`/ranking/${test.testId}`} className="btn bg-mainColor border-none">
                  Ranking Page
                </Link>
              </div>
            </div>
          </div>
        ))}
        </div>

        </>
    )
}


export default rankings