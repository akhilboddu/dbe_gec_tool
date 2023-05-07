import React from "react";
import Info from "../../components/shared/info";
import { Link } from "@tanstack/react-location";
import { auth } from "/src/firebase";

const TeacherDashboard = () => {


  const cards = [
    {
      title: "Test",
      actions: [
        {
          label: "Create",
          url: "/dashboard/create-test/teacher",
        },
        {
          label: "List",
          url: "/dashboard/test-list/teacher",
        }
      ],
    },
    {
      title: "Assignment",
      actions: [
        {
          label: "Create",
          url: "/dashboard/create-assignments/teacher",
        },
        // {
        //   label: "List",
        //   url: "/dashboard/test-list/teacher",
        // }
      ],
    },
    // {
    //   title: "assignments",
    //   action: "Create",
    //   url: "/dashboard/create-assignments/teacher",
    // },
    {
      title: "Grades",
      actions: [
        {
          label: "View",
          url: `/grades/${auth.currentUser?.uid}`,
        },
      ],
    },
  ];

  return (
    <div className="space-y-4 lg:space-y-8">
      <h2 className="text-2xl font-bold lg:text-3xl">Welcome Teacher</h2>

      <Info
        text={"You are upto date with all your assignments. Great stuff!"}
      />

      <div className="flex">
        {cards.map((card, index) => {
          return (
            <div
              key={index}
              className="w-1/4 ml-4 card card-bordered bg-base-300 lg:aspect-2/1"
            >
              <div className="card-body">
                <h3 className="card-title">{card.title}</h3>
                <div className="lg:relative lg:flex-1">
                  <p className="lg:absolute lg:inset-0 lg:overflow-hidden">
                    { }
                  </p>
                </div>
                <div className="justify-end card-actions">
                  {
                    card.actions.map((action, actionIndex) => {
                      return (
                      <Link to={action.url} className="border-none btn bg-mainColor" key={actionIndex}>
                        {action.label}
                      </Link>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeacherDashboard;
