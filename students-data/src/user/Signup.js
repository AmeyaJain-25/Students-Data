import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from "../auth";
import Base from "../core/Base";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in SignUp"));
  };

  //SUCCESS Message
  const successMessage = () => {
    return (
      <h6
        style={{
          display: success ? "" : "none",
          border: "none",
          width: "100%",
          backgroundColor: "transparent",
          textAlign: "center",
          minHeight: "40px",
          marginTop: "5px",
          color: "green",
        }}
      >
        New Account Created Successfully <br />
        <Link
          to="/signin"
          style={{
            backgroundColor: "transparent",
            textAlign: "center",
            textDecoration: "none",
            color: "rgb(197,229,214)",
          }}
        >
          Please Login Here
        </Link>
      </h6>
    );
  };

  //ERROR Message
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

  const signUpForm = () => {
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
                SIGN UP
              </h2>
              {successMessage()}
              {errorMessage()}
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                value={name}
                style={{
                  border: "1px solid #242c37",
                  borderRadius: "999px",
                  backgroundColor: "transparent",
                  textAlign: "center",
                  minHeight: "40px",
                  marginTop: "20px",
                  color: "rgb(197,229,214)",
                }}
                onChange={handleChange("name")}
              />
            </div>
            <div className="form-group">
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
                onChange={handleChange("password")}
              />
            </div>
            <button
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
              onClick={onSubmit}
              className="btn"
            >
              Submit
            </button>

            <h6 style={{ marginTop: "15px" }}>
              <Link
                to="/signin"
                style={{
                  backgroundColor: "transparent",
                  textAlign: "center",
                  textDecoration: "none",
                  color: "rgb(197,229,214)",
                }}
              >
                Already have an account ? Sign In
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
        {signUpForm()}
      </div>
    </Base>
  );
};

export default Signup;
