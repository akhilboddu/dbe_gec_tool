import logo from "../../assets/dbe_logo.png" 

export default function Footer() {
  return (
    <footer className="">
      <div className="container footer p-8">
        <div>
          <img src={logo} alt="logo" className="w-3/6"/>
        </div>
        <div>
          <span className="footer-title w-full">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
        </div>
        <div>
          <span className="footer-title w-full">Legal</span>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </div>
      </div>
    </footer>
  );
}
