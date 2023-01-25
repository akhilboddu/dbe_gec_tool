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
import UserCourseDetail from "/src/pages/user-course-detail";
import UserCourseTest from "/src/pages/user-course-test";
import UserInfo from "/src/pages/user-info";
import UserLessonDetail from "/src/pages/user-lesson-detail";
import UserQuestionDetail from "/src/pages/user-question-detail";

import Tests from "./pages/Tests/tests";
import { CourseContextProvider } from "./context/courseContext";
import Assignments from "./pages/Assignments/assignments";
import Grades from "./pages/Grades/grades";
import CreateTest from "./pages/Teacher/Create-Tests/Create-Test";
import CreateAssessments from "./pages/Teacher/Create-Assessments/Create-Assessments";
import Notifications from "react-notify-toast";

const queryClient = new QueryClient();
const location = new ReactLocation();

const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
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
        path: "/tests",
        element: (
          <CheckLogin>
            <Tests />
          </CheckLogin>
        ),
      },
      {
        path: "/assignments/:teacher",
        element: <Assignments />,
      },
      {
        path: "/grades/",
        element: (
          <CheckLogin>
            <Grades />
          </CheckLogin>
        ),
      },
      {
        path: "/grades/:teacherId",
        element: (
          <CheckLogin>
            <Grades />
          </CheckLogin>
        ),
      },
      {
        path: "/ranking",
        element: <Rankings />,
      },
      {
        path: "/login/:role",
        element: (
          <CheckLogout>
            <Login />
          </CheckLogout>
        ),
      },
      {
        path: "/register/:role",
        element: (
          <CheckLogout>
            <Register />
          </CheckLogout>
        ),
      },
      {
        path: "/teacher-dashboard",
        element: <TeacherDashboard />,
      },
      {
        path: "/dashboard/create-test",
        element: <CreateTest />,
      },
      {
        path: "/dashboard/create-assignments/teacher",
        element: (
          <CheckLogin>
            <CreateAssessments />
          </CheckLogin>
        ),
      },
      {
        path: "/ranking/:testId",
        element: <CourseLeaderboard />,
      },
      {
        path: "/:testId",
        element: <UserCourseTest />,
      },
      {
        path: "/result/:testId/:attemptId/:gradeId/:teacherId",
        children: [
          {
            path: "/",
            element: (
              <CheckLogin>
                <UserCourseTest />
              </CheckLogin>
            ),
          },
        ],
      },
      {
        path: "/result/:testId/:attemptId",
        children: [
          {
            path: "/",
            element: (
              <CheckLogin>
                <UserCourseTest />
              </CheckLogin>
            ),
          },
        ],
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
