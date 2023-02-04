import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">GoalSetter</Link>
        <ul>
          <Link to="/login">
            <FaSignInAlt />
            Login
          </Link>

          <Link to="/register">
            <FaUser />
            Register
          </Link>
        </ul>
      </div>
    </header>
  );
}

export default Header;
