import {
  AdjustmentsVerticalIcon,
  ArrowRightOnRectangleIcon,
  AtSymbolIcon,
  CpuChipIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "@tanstack/react-location";
import React, {useState} from "react"
import clsx from "clsx";
import { auth } from "/src/firebase";
import { signOut } from "firebase/auth";
import Logo from '../../assets/dbe_logo.png'

export default function Header() {
  // location
  const navigate = useNavigate();
  const {
    current: { pathname },
  } = useLocation();


  const logout = () => {
    
    signOut(auth).then(()=>{
      console.log("Successfully signed out")
      navigate({ to: "/login" });

    }).catch((error)=>{
      console.log(error)
    })
    
  };


  const isAdminPage = pathname.startsWith("/admin");


  return (
    <nav
      className={clsx("shadow-md", {
        "bg-error": isAdminPage,
      })}
    >
      <div className="container navbar flex-wrap">
        {/* start */}
        <div className="mr-auto flex flex-wrap">
          <Link to="/" className="btn btn-ghost">
            <img src={Logo} alt="logo" className="w-32 pt-0"/>
          </Link>
          <Link to="/" className="btn btn-ghost gap-1">
            <HomeIcon className="h-5 w-5" />
            Home
          </Link>
        </div>

        <div className="ml-auto">
          {auth.currentUser ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost">
                {auth.currentUser.email}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-200 p-2 shadow-lg"
              >
                <li>
                  <Link to="/user">
                    <UserIcon className="h-5 w-5" /> Profile
                  </Link>
                </li>
                <li onClick={logout}>
                  <span>
                    <ArrowRightOnRectangleIcon className="h-5 w-5" /> Log out
                  </span>
                </li>
              </ul>
            </div>
          ) : (
            <Link className="btn btn-mainColor" to="/login">
              Log in
            </Link>
          )}
        </div>
        {/* end navbar-end */}
      </div>
    </nav>
  );
}
