import React from "react";
import { Link, Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <nav className="d-flex justify-content-center gap-3 mt-5">
        <Link
          className="text-decoration-none bg-primary text-white rounded-3 px-4 py-2"
          to="/login"
        >
          Login
        </Link>
        <Link
          className="text-decoration-none bg-dark text-white rounded-3 px-4 py-2"
          to="/register"
        >
          Sign Up
        </Link>
      </nav>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
