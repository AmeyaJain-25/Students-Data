import React, { useState } from "react";
import Base from "../core/Base";
import { createStudent } from "../user/helper/apicalls";
import { isAuthenticated } from "../auth";

const AddStudent = () => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    gender: "",
    branch: "",
    day: "",
    month: "",
    year: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    email: "",
    contactNumber: "",
    adhaarCard: "",
    loading: false,
    error: "",
    createdStudent: "",
    getRedirect: false,
  });

  //Destructuring values of useState
  const {
    name,
    gender,
    branch,
    day,
    month,
    year,
    street,
    city,
    state,
    country,
    postalCode,
    email,
    contactNumber,
    adhaarCard,
    loading,
    error,
    createdStudent,
    getRedirect,
  } = values;

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createStudent(user._id, token, {
      name,
      gender,
      branch,
      day,
      month,
      year,
      street,
      city,
      state,
      country,
      postalCode,
      email,
      contactNumber,
      adhaarCard,
    })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          console.log(data);
          setValues({
            ...values,
            name: "",
            gender: "",
            branch: "",
            day: "",
            month: "",
            year: "",
            street: "",
            city: "",
            state: "",
            country: "",
            postalCode: "",
            email: "",
            contactNumber: "",
            adhaarCard: "",
            loading: false,
            createdStudent: data.name,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const successMessage = () => {
    return (
      <h1
        style={{
          display: createdStudent ? "" : "none",
          border: "none",
          width: "100%",
          backgroundColor: "transparent",
          textAlign: "center",
          minHeight: "40px",
          marginTop: "5px",
          color: "green",
        }}
      >
        Student Created successfully
      </h1>
    );
  };

  const warningMessage = () => {
    return (
      <h5
        style={{
          display: createdStudent ? "" : "none",
          border: "none",
          width: "100%",
          backgroundColor: "transparent",
          textAlign: "center",
          minHeight: "40px",
          marginTop: "5px",
          color: "red",
        }}
      >
        {createdStudent} failed to create
      </h5>
    );
  };

  const createStudentForm = () => {
    return (
      <div
        style={{
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <form
          style={{
            boxShadow: "0 0 250px #000",
            textAlign: "center",
            padding: "3rem 3rem",
            maxWidth: "40rem",
            width: "100%",
            borderRadius: "20px",
            marginTop: "5vmin",
          }}
        >
          <h2
            style={{
              fontSize: "2.75rem",
              fontWeight: "500",
              margin: "0 0 2rem 1rem",
              color: "rgb(197,229,214)",
            }}
          >
            Add Student
          </h2>
          {successMessage()}
          {/* {warningMessage()} */}
          <div className="row">
            <div className="col-md-6">
              <h6
                style={{
                  fontSize: "2.5em",
                  fontWeight: "200",
                  margin: "20px 0 0 0",
                  color: "rgb(197,229,214)",
                }}
              >
                Enter Details
              </h6>
              <div className="form-group">
                <input
                  onChange={handleChange("name")}
                  name="photo"
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
                />
              </div>
              <div className="form-group">
                <select
                  onChange={handleChange("gender")}
                  className="form-control"
                  placeholder="Gender"
                  style={{
                    border: "1px solid #242c37",
                    borderRadius: "999px",
                    backgroundColor: "transparent",
                    textAlign: "center",
                    minHeight: "40px",
                    marginTop: "20px",
                    color: "rgb(197,229,214)",
                  }}
                >
                  <option>Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  onChange={handleChange("branch")}
                  className="form-control"
                  placeholder="Class"
                  value={branch}
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
              <div className="form-group">
                <input
                  onChange={handleChange("email")}
                  className="form-control"
                  type="email"
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
                />
              </div>
              <div className="form-group">
                <input
                  onChange={handleChange("contactNumber")}
                  type="number"
                  className="form-control"
                  placeholder="Contact Number"
                  value={contactNumber}
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
              <div className="form-group">
                <input
                  onChange={handleChange("adhaarCard")}
                  className="form-control"
                  placeholder="Adhaar Card Number"
                  value={adhaarCard}
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
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <h6
                  style={{
                    fontSize: "1.5em",
                    fontWeight: "200",
                    margin: "20px 0 0 0",
                    color: "rgb(197,229,214)",
                  }}
                >
                  Address
                </h6>
                <input
                  onChange={handleChange("street")}
                  className="form-control"
                  placeholder="Street"
                  value={street}
                  style={{
                    border: "1px solid #242c37",
                    borderRadius: "999px",
                    backgroundColor: "transparent",
                    textAlign: "center",
                    minHeight: "40px",
                    marginTop: "10px",
                    color: "rgb(197,229,214)",
                  }}
                />
                <input
                  onChange={handleChange("city")}
                  className="form-control"
                  placeholder="City"
                  value={city}
                  style={{
                    border: "1px solid #242c37",
                    borderRadius: "999px",
                    marginTop: "5px",
                    backgroundColor: "transparent",
                    textAlign: "center",
                    minHeight: "40px",
                    color: "rgb(197,229,214)",
                  }}
                />
                <input
                  onChange={handleChange("state")}
                  className="form-control"
                  placeholder="State"
                  value={state}
                  style={{
                    border: "1px solid #242c37",
                    borderRadius: "999px",
                    marginTop: "5px",
                    backgroundColor: "transparent",
                    textAlign: "center",
                    minHeight: "40px",
                    color: "rgb(197,229,214)",
                  }}
                />
                <input
                  onChange={handleChange("country")}
                  className="form-control"
                  placeholder="Country"
                  value={country}
                  style={{
                    border: "1px solid #242c37",
                    borderRadius: "999px",
                    marginTop: "5px",
                    backgroundColor: "transparent",
                    textAlign: "center",
                    minHeight: "40px",
                    color: "rgb(197,229,214)",
                  }}
                />
                <input
                  onChange={handleChange("postalCode")}
                  className="form-control"
                  type="number"
                  placeholder="Postal Code"
                  value={postalCode}
                  style={{
                    border: "1px solid #242c37",
                    borderRadius: "999px",
                    marginTop: "5px",
                    backgroundColor: "transparent",
                    textAlign: "center",
                    minHeight: "40px",
                    color: "rgb(197,229,214)",
                  }}
                />
              </div>
              <div className="form-group">
                <h6
                  style={{
                    fontSize: "1.5em",
                    fontWeight: "200",
                    marginTop: "30px",
                    color: "rgb(197,229,214)",
                  }}
                >
                  BirthDate
                </h6>

                <input
                  onChange={handleChange("day")}
                  type="number"
                  className="form-control"
                  placeholder="DD"
                  value={day}
                  style={{
                    border: "1px solid #242c37",
                    borderRadius: "999px",
                    marginTop: "5px",
                    backgroundColor: "transparent",
                    textAlign: "center",
                    minHeight: "40px",
                    color: "rgb(197,229,214)",
                  }}
                />
                <input
                  onChange={handleChange("month")}
                  type="number"
                  className="form-control"
                  placeholder="MM"
                  value={month}
                  style={{
                    border: "1px solid #242c37",
                    borderRadius: "999px",
                    marginTop: "5px",
                    backgroundColor: "transparent",
                    textAlign: "center",
                    minHeight: "40px",
                    color: "rgb(197,229,214)",
                  }}
                />
                <input
                  onChange={handleChange("year")}
                  type="number"
                  className="form-control"
                  placeholder="YYYY"
                  value={year}
                  style={{
                    border: "1px solid #242c37",
                    borderRadius: "999px",
                    marginTop: "5px",
                    backgroundColor: "transparent",
                    textAlign: "center",
                    minHeight: "40px",
                    color: "rgb(197,229,214)",
                  }}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            style={{
              border: "1px solid #242c37",
              borderRadius: "999px",
              marginTop: "25px",
              textAlign: "center",
              backgroundImage:
                "linear-gradient(160deg, #8ceabb 0%, #378f7b 100%)",
              color: "#242c37",
              fontSize: "1.5em",
              height: "50px",
              width: "40%",
            }}
            onClick={(event) => {
              onSubmit(event);
            }}
            className="btn btn-outline-success mb-3"
          >
            Create Student
          </button>
        </form>
      </div>
    );
  };

  return (
    <Base
      style={{
        backgroundColor: "#354152",
        color: "#7e8ba3",
        font: "300 #1rem/#1.5 Helvetica Neue, sans-serif",
        margin: "0",
        minHeight: "100vh",
      }}
    >
      <div className="bg-dark">
        <div className="col-md-8 offset-md-2">{createStudentForm()}</div>
      </div>
    </Base>
  );
};

export default AddStudent;
