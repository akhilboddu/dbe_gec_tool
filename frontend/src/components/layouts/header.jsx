import {
  AdjustmentsVerticalIcon,
  ArrowRightOnRectangleIcon,
  AtSymbolIcon,
  CpuChipIcon,
  HomeIcon,
  UserIcon,
  BookOpenIcon,
  ShieldExclamationIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import {
  Link,
  useLocation,
  useNavigate,
  useMatch,
} from "@tanstack/react-location";
import React, { useState } from "react";
import clsx from "clsx";
import { auth } from "/src/firebase";
import { signOut } from "firebase/auth";
import Logo from "../../assets/dbe_logo.png";

export default function Header() {
  // location
  const navigate = useNavigate();

  const currentLocation = useLocation();

  const currentPath = currentLocation.current.pathname;
  const {
    current: { pathname },
  } = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("Successfully signed out");
        localStorage.removeItem("user");

        if (user.role === "teacher") {
          navigate({ to: "/login/teacher" });
        } else {
          navigate({ to: "/login/" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isAdminPage = null;

  return (
    <nav
      className={clsx("shadow-md", "bg-white", "fixed", "w-[100%]", "z-10", {
        "bg-error": isAdminPage,
      })}
    >
      <div className="container flex-wrap navbar">
        {/* start */}
        <div className="flex flex-wrap mr-auto">
          <Link
            className="btn btn-ghost"
          >
            <img src={Logo} alt="logo" className="w-32 pt-0" />
          </Link>

          {user?.email ? (
            <>
              <Link
                to={user?.role === "teacher" ? "/teacher-dashboard" : "/"}
                className="gap-1 btn btn-ghost"
              >
                <HomeIcon className="w-5 h-5" />
                Home
              </Link>
              <Link
                to={
                  currentPath.endsWith("teacher") ? "/tests/teacher" : "/tests"
                }
                className="gap-1 btn btn-ghost"
              >
                <ShieldExclamationIcon className="w-5 h-5" />
                Tests
              </Link>
              <Link
                to={
                  user?.role === "teacher" ? `/grades/${user?.id}` : "/grades"
                }
                className="gap-1 btn btn-ghost"
              >
                <StarIcon className="w-5 h-5" />
                Grades
              </Link>
            </>
          ) : null}
        </div>

        <div className="ml-auto">
          {user?.email ? (
            <div className="dropdown-end dropdown">
              <label tabIndex={0} className="btn btn-ghost">
                {user?.email}
              </label>
              <ul
                tabIndex={0}
                className="p-2 mt-3 shadow-lg dropdown-content menu rounded-box menu-compact w-52 bg-base-200"
              >
                <li>
                  <Link to="/user">
                    <UserIcon className="w-5 h-5" /> Profile
                  </Link>
                </li>
                <li onClick={logout}>
                  <span>
                    <ArrowRightOnRectangleIcon className="w-5 h-5" /> Log out
                  </span>
                </li>
              </ul>
            </div>
          ) : (
            <Link className="btn-mainColor btn" to="/login/">
              Log in
            </Link>
          )}
        </div>
        {/* end navbar-end */}
      </div>
    </nav>
  );
}
