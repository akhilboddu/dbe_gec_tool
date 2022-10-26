import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { Provider } from "jotai";
import { QueryClient, QueryClientProvider } from "react-query";
import CheckLogin from "/src/components/authentication/check-login";
import CheckLogout from "/src/components/authentication/check-logout";
import Layout from "/src/components/layouts/layout";
import Error from "/src/components/shared/error";
import AdminCourses from "/src/pages/admin-courses";
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

import { CourseContextProvider } from "./context/courseContext";
import { auth } from "./firebase";

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
        path: "/login/",
        element: (
          <CheckLogout>
            <Login />
          </CheckLogout>
        ),
      },
      {
        path: "/register/",
        element: (
          <CheckLogout>
            <Register />
          </CheckLogout>
        ),
      },
      {
        path: "/tests/:testId",
        children: [
          {
            path: "/",
            element: (
            <CheckLogin>
            <UserCourseTest/>
            </CheckLogin>
            )
          }  
        ],
      },
      {
        path: "/lessons/:lessonId/",
        element: (
          // <CheckLogin>
            <UserLessonDetail />
          // </CheckLogin>
        ),
      },
      {
        path: "/questions/:questionId/",
        element: (
          // <CheckLogin>
            <UserQuestionDetail />
          // </CheckLogin>
        ),
      },
      {
        path: "/admin",
        element: (
          // <CheckLogin>
            <Outlet />
          // </CheckLogin>
        ),
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
