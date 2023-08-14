import { Outlet } from "@tanstack/react-location";

import NoAccess from "../no-access";
import { auth } from "/src/firebase";

export default function TeacherLayout() {
  const currentUser = auth.currentUser;
  const userLocal = JSON.parse(localStorage.getItem("user"));

  if (userLocal?.role?.toLowerCase() !== "teacher") {
    return <NoAccess />;
  }
  return <Outlet />;
}
