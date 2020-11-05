import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { authenticate, isAuthenticated, signin } from "../auth";
import Base from "../core/Base";

const Signin = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });
  const { email, password, error, loading, didRedirect } = values;

  const { user } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onsubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({ ...values, didRedirect: true, email: "", error: "" });
          });
        }
      })
      .catch(console.log("Sign In Failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <h6
          style={{
            border: "none",
            width: "100%",
            backgroundColor: "transparent",
            textAlign: "center",
            minHeight: "40px",
            marginTop: "5px",
            color: "green",
          }}
        >
          Loading......!
        </h6>
      )
    );
  };

  const errorMessage = () => {
    return (
      <h6
        style={{
          display: error ? "" : "none",
          border: "none",
          width: "100%",
          backgroundColor: "transparent",
          textAlign: "center",
          minHeight: "40px",
          marginTop: "5px",
          color: "red",
        }}
      >
        {error}
      </h6>
    );
  };

  const signInForm = () => {
    return (
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            boxShadow: "0 0 250px #000",
            textAlign: "center",
            padding: "3rem 3rem",
            maxWidth: "22rem",
            width: "100%",
            borderRadius: "6px",
            marginTop: "10vmin",
          }}
        >
          <form>
            <div className="form-group">
              <h2
                style={{
                  fontSize: "2.75rem",
                  fontWeight: "500",
                  margin: "0 0 2rem 1rem",
                  color: "rgb(197,229,214)",
                }}
              >
                SIGN IN
              </h2>
              {loadingMessage()}
              {errorMessage()}
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                style={{
                  border: "1px solid #242c37",
                  borderRadius: "999px",
                  backgroundColor: "transparent",
                  textAlign: "center",
                  minHeight: "40px",
                  marginTop: "20px",
                  color: "rgb(197,229,214)",
                }}
                onChange={handleChange("email")}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={handleChange("password")}
                value={password}
                style={{
                  border: "1px solid #242c37",
                  borderRadius: "999px",
                  backgroundColor: "transparent",
                  textAlign: "center",
                  minHeight: "40px",
                  marginTop: "20px",
                  color: "rgb(197,229,214)",
                }}
              />
            </div>
            <button
              className="btn"
              style={{
                border: "1px solid #242c37",
                borderRadius: "999px",
                marginTop: "25px",
                textAlign: "center",
                backgroundImage:
                  "linear-gradient(160deg, #8ceabb 0%, #378f7b 100%)",
                color: "#fff",
                width: "100%",
              }}
              onClick={onsubmit}
            >
              Submit
            </button>
            <h6 style={{ marginTop: "15px" }}>
              <Link
                to="/signup"
                style={{
                  backgroundColor: "transparent",
                  textAlign: "center",
                  textDecoration: "none",
                  color: "rgb(197,229,214)",
                }}
              >
                Don't have an account ? Create an Account
              </Link>
            </h6>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base>
      <div
        style={{
          backgroundColor: "#354152",
          color: "#7e8ba3",
          font: "300 #1rem/#1.5 Helvetica Neue, sans-serif",
          margin: "0",
          minHeight: "100vh",
        }}
      >
        {signInForm()}
        {performRedirect()}
      </div>
    </Base>
  );
};

export default Signin;
