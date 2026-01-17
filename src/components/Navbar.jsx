import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <img src={logo} alt="Short Stays" className="navbar-logo" />
    </nav>
  );
}

export default Navbar;
