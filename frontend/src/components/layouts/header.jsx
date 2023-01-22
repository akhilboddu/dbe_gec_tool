import {
  AdjustmentsVerticalIcon,
  ArrowRightOnRectangleIcon,
  AtSymbolIcon,
  CpuChipIcon,
  HomeIcon,
  UserIcon,
  BookOpenIcon,
  ShieldExclamationIcon,
  StarIcon

} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate, useMatch } from "@tanstack/react-location";
import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
import clsx from "clsx";
import { auth } from "/src/firebase";
import { signOut } from "firebase/auth";
import Logo from "../../assets/dbe_logo.png";
import { useEffect } from "react";

export default function Header() {
  // location
  const navigate = useNavigate();
  // const {
  //   current: { pathname },
  // } = useLocation();

  const currentLocation = useLocation()

  const currentPath = currentLocation.current.pathname

  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("Successfully signed out");
        navigate({ to: "/login/" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isAdminPage = null;
  
 

  return (
    <nav
      className={clsx("shadow-md", "bg-white", "fixed", "w-[100%]", "z-10",  {
        "bg-error": isAdminPage,
      })}
    >
      <div className="container flex-wrap navbar">
        {/* start */}
        <div className="flex flex-wrap mr-auto">
          <Link to={currentPath.endsWith("teacher")? "/teacher-dashboard/teacher":"/"} className="btn btn-ghost">
            <img src={Logo} alt="logo" className="w-32 pt-0" />
          </Link>
          <Link to={currentPath.endsWith("teacher")? "/teacher-dashboard/teacher":"/"} className="gap-1 btn btn-ghost">
            <HomeIcon className="w-5 h-5" />
            Home
          </Link>
          {auth.currentUser ? (
            <>
              <Link to={currentPath.endsWith("teacher")?"/tests/teacher":"/tests"} className="gap-1 btn btn-ghost">
                <ShieldExclamationIcon className="w-5 h-5" />
                Tests
              </Link>
              <Link to={currentPath.endsWith("teacher")?"/tests/teacher":"/assignments"} className="gap-1 btn btn-ghost">
                <BookOpenIcon className="w-5 h-5" />
                Assignments
              </Link>
              <Link to={currentPath.endsWith("teacher")?"/grades/teacher":"/grades"} className="gap-1 btn btn-ghost">
                <StarIcon className="w-5 h-5" />
                Grades
              </Link>
            </>
          ) : null}
        </div>

        <div className="ml-auto">
          {auth.currentUser ? (
            <div className="dropdown-end dropdown">
              <label tabIndex={0} className="btn btn-ghost">
                {auth.currentUser.email}
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
