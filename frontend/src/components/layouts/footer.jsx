import {
  Link,
  useMatch,
  useLocation
} from "@tanstack/react-location";
import logo from "../../assets/dbe_logo.png";
import { useAtom } from "jotai";
import { userAtom } from "/src/stores/auth.store";

export default function Footer() {
  const location = useLocation();
  const userLocal = JSON.parse(localStorage.getItem("user"));
  return (
    <footer className="">
      <div className="container footer p-8">
        <div>
          <img src={logo} alt="logo" className="w-3/6" />
        </div>
        <div>
          <span className="footer-title w-full">Company</span>
          {userLocal?.role === "teacher" && <Link className="link link-hover" to="/teacher/ranking">
            Rankings
          </Link>}
          {!userLocal && 
          <Link
            className="link link-hover"
            to={location.current.pathname.includes("teacher") ? "/login/student" : "/login/teacher"}
          >
            {location.current.pathname.includes("teacher") ? "Student " : "Teacher "} Login
          </Link>}
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
        </div>
        <div>
          <span className="footer-title w-full">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
        </div>
      </div>
    </footer>
  );
}
