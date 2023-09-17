import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { Provider } from "jotai";
import { QueryClient, QueryClientProvider } from "react-query";
import CheckLogin from "/src/components/authentication/check-login";
import CheckLogout from "/src/components/authentication/check-logout";
import Layout from "/src/components/layouts/layout";
import Error from "/src/components/shared/error";
import AdminCourses from "/src/pages/admin-courses";
import Rankings from "./pages/rankings";
import TeacherDashboard from "./pages/Teacher/TeacherDashboard";
import AdminLessons from "/src/pages/admin-lessons";
import AdminQuestions from "/src/pages/admin-questions";
import CourseLeaderboard from "/src/pages/course-leaderboard";
import Home from "/src/pages/home";
import Login from "/src/pages/login";
import Register from "/src/pages/register";
import UserCourseTest from "/src/pages/user-course-test";
import UserCourseAssignment from "/src/pages/user-course-assignment";
import UserInfo from "/src/pages/user-info";
import UserLessonDetail from "/src/pages/user-lesson-detail";
import UserQuestionDetail from "/src/pages/user-question-detail";

import Tests from "./pages/Tests/tests";
import { CourseContextProvider } from "./context/courseContext";
import Assignments from "./pages/Assignments/assignments";
import Grades from "./pages/Grades/grades";
import CreateTest from "./pages/Teacher/Create-Tests/Create-Test";
import TestList from "./pages/Teacher/Tests/List/Test-List";
import AssignmentList from "./pages/Teacher/Create-Assessments/Assignment-List";
import CreateAssessments from "./pages/Teacher/Create-Assessments/Create-Assessments";
import ProtectedTeacherLayout from "./components/layouts/teacher-layout";
import ProtectedStudentLayout from "./components/layouts/student-layout";
import React, { useEffect } from "react";

const queryClient = new QueryClient();
const location = new ReactLocation();

const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <CheckLogout>
            <Login />
          </CheckLogout>
        ),
      },
      {
        path: "/user/",
        element: (
          <CheckLogin>
            <UserInfo />
          </CheckLogin>
        ),
      },

      {
        path: "/assignments/:teacher",
        element: <Assignments />,
      },
      {
        path: "login",
        children: [
          {
            path: "/",
            element: (
              <CheckLogout>
                <Login />
              </CheckLogout>
            ),
          },
          {
            path: ":role",
            element: (
              <CheckLogout>
                <Login />
              </CheckLogout>
            ),
          },
        ],
      },
      {
        path: "register",
        children: [
          {
            path: "/",
            element: (
              <CheckLogout>
                <Register />
              </CheckLogout>
            ),
          },
          {
            path: ":role",
            element: (
              <CheckLogout>
                <Register />
              </CheckLogout>
            ),
          },
        ],
      },
      {
        path: "student",
        element: (
          <CheckLogin>
            <ProtectedStudentLayout />
          </CheckLogin>
        ),
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/dashboard",
            element: <Home />,
          },
          {
            path: "/assignments",
            element: <Assignments />,
          },
          {
            path: "detail-assignment/:assignmentId",
            element: <UserCourseAssignment />,
          },
          {
            path: "/grades",
            element: <Grades />,
          },
          {
            path: "/tests",
            element: <Tests />,
          },
          {
            path: ":testId",
            element: <UserCourseTest />,
          },
        ],
      },
      {
        path: "teacher",
        element: (
          <CheckLogin>
            <ProtectedTeacherLayout />
          </CheckLogin>
        ),
        children: [
          {
            path: "/",
            element: <TeacherDashboard />,
          },
          {
            path: "/dashboard",
            element: <TeacherDashboard />,
          },
          {
            path: "/test-list",
            element: <TestList />,
          },
          {
            path: "/create-test",
            element: <CreateTest action={"create"} />,
          },
          {
            path: "/update-test/:testId",
            element: <CreateTest action={"update"} />,
          },
          {
            path: "/assignment-list",
            element: <AssignmentList />,
          },
          {
            path: "/create-assignments",
            element: <CreateAssessments action={"create"} />,
          },
          {
            path: "/update-assignments/:assignmentId",
            element: <CreateAssessments action={"update"} />,
          },
          {
            path: "/grades/:teacherId",
            element: <Grades />,
          },
          {
            path: "/result/:testId/:attemptId/:gradeId/:teacherId",
            children: [
              {
                path: "/",
                element: <UserCourseTest />,
              },
            ],
          },
          {
            path: "/ranking",
            element: <Rankings />,
          },
        ],
      },
      {
        path: "/result/:testId/:attemptId",
        children: [
          {
            path: "/",
            element: <UserCourseTest />,
          },
        ],
      },

      {
        path: "/ranking/:testId",
        element: <CourseLeaderboard />,
      },
      {
        path: "/lessons/:lessonId/",
        element: <UserLessonDetail />,
      },
      {
        path: "/questions/:questionId/",
        element: <UserQuestionDetail />,
      },
      {
        path: "/admin",
        element: <Outlet />,
        children: [
          {
            path: "/test",
            children: [
              {
                path: "/",
                element: <AdminCourses />,
              },
              {
                path: "/:testId/lessons",
                element: <AdminLessons />,
              },
            ],
          },
          {
            path: "/lessons/:lessonId/questions",
            element: <AdminQuestions />,
          },
        ],
      },
      {
        element: <Error text="Invalid route" />,
      },
    ],
  },
];

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <CourseContextProvider>
          <Router routes={routes} location={location} />
        </CourseContextProvider>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
