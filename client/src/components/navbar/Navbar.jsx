import "./navbar.css";
import { Link,NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">Hotal booking</span>
        </Link>
        {user ? user.username : (
          <div className="navItems">
           <NavLink to="/Registration"> <button className="navButton">Register</button></NavLink>
            <NavLink to="/Login"><button className="navButton">Login</button></NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
