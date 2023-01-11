import React from "react";
import Info from "../../components/shared/info";
import { Link } from "@tanstack/react-location";

const TeacherDashboard=()=> {


  return (
    <div className="space-y-4 lg:space-y-8">
      <h2 className="text-2xl font-bold lg:text-3xl">Welcome Teacher</h2>

      <Info
        text={"You are upto date with all your assignments. Great stuff!"}
      />
    
      <div className="flex">
        <div className="card card-bordered ml-4 w-1/4 bg-base-300 lg:aspect-2/1">
          <div className="card-body">
            <h3 className="card-title">Test</h3>

            <div className="lg:relative lg:flex-1">
              <p className="lg:absolute lg:inset-0 lg:overflow-hidden">{}</p>
            </div>

            <div className="card-actions justify-end">
              <Link to={`/dashboard/create-test`} className="btn border-none bg-mainColor">
                Create
              </Link>
            </div>
          </div>
        </div>

        <div className="card card-bordered ml-4 w-1/4 bg-base-300 lg:aspect-2/1">
          <div className="card-body">
            <h3 className="card-title">Assessments</h3>

            <div className="lg:relative lg:flex-1">
              <p className="lg:absolute lg:inset-0 lg:overflow-hidden">{}</p>
            </div>

            <div className="card-actions justify-end">
              <Link to={`/dashboard/create-assessment`} className="btn border-none bg-mainColor">
                Create 
              </Link>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  )
}

export default TeacherDashboard