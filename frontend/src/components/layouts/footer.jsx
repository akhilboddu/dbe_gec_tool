import { Link } from "@tanstack/react-location";
import logo from "../../assets/dbe_logo.png";

export default function Footer() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <footer className="">
      <div className="container footer p-8">
        <div>
          <img src={logo} alt="logo" className="w-3/6" />
        </div>
        <div>
          <span className="footer-title w-full">Company</span>
          <Link className="link link-hover" to="/ranking">
            Rankings
          </Link>
          <Link
            className="link link-hover"
            to={user?.role === "teacher" ? "/login/student" : "/login/teacher"}
          >
            {user?.role === "teacher" ? "Student " : "Teacher "} Login
          </Link>
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
