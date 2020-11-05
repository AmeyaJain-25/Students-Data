import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from "../auth";
const activeTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        {isAuthenticated() && (
          <li className="nav-item">
            <Link style={activeTab(history, "/")} className="nav-link" to="/">
              Student Data
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              style={activeTab(history, "/user/profile")}
              className="nav-link"
              to="/user/profile"
            >
              Profile
            </Link>
          </li>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              style={activeTab(history, "/admin/dashboard")}
              className="nav-link"
              to="/admin/dashboard"
            >
              Admin Dashboard
            </Link>
          </li>
        )}

        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link
                style={activeTab(history, "/signup")}
                className="nav-link"
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={activeTab(history, "/signin")}
                className="nav-link"
                to="/signin"
              >
                Sign In
              </Link>
            </li>
          </Fragment>
        )}

        {isAuthenticated() && (
          <li className="nav-item">
            <span
              style={{ cursor: "pointer" }}
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  return history.push("/");
                });
              }}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
