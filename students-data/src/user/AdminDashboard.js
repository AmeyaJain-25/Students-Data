import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth";
import Base from "../core/Base";
import { deleteStudent, getAllStudents } from "./helper/apicalls";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllStudents(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStudents(data);
      }
    });
  };
  const deleteThisStudent = (studentId) => {
    deleteStudent(studentId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);
  return (
    <Base>
      <div className="container table-container" style={{ minHeight: "100vh" }}>
        <h3 style={{ margin: "10px 0" }}>
          <Link
            style={{
              backgroundColor: "transparent",
              textAlign: "center",
              minHeight: "40px",
              padding: "5px",
              color: "firebrick",
              float: "right",
              textDecoration: "none",
            }}
            to="/admin/create/student"
          >
            + Add Student
          </Link>
        </h3>
        <table
          className="table table-hover table-striped text-center sortable"
          style={{
            cursor: "pointer",
            borderRadius: "30px",
            backgroundImage:
              "linear-gradient(160deg, #8ceabb 0%, #378f7b 100%)",
          }}
        >
          <thead className="sortable">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Gender</th>
              <th scope="col">Class</th>
              <th scope="col" data-dateformat="YYYY-MM-DD">
                BirthDate
              </th>
              <th scope="col">Address</th>
              <th scope="col">Email</th>
              <th scope="col">Contact</th>
              <th scope="col">Adhaar No.</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody
            style={{
              color: "#242c37",
              font: "300 #1rem/#1.5 Helvetica Neue, sans-serif",
            }}
          >
            {students.map((student, index) => {
              return (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.gender.toUpperCase()}</td>
                  <td>{student.branch}</td>
                  <td>{`${student.birthday.year}-${student.birthday.month}-${student.birthday.day}`}</td>
                  <td>{`${student.address.street}, ${student.address.city}, ${student.address.state}, ${student.address.country}, ${student.address.postalCode}`}</td>
                  <td>{student.email}</td>
                  <td>{student.contactNumber}</td>
                  <td>{student.adhaarCard}</td>
                  <td>
                    <button
                      style={{
                        border: "1px solid #242c37",
                        borderRadius: "999px",
                        marginTop: "25px",
                        textAlign: "center",
                        backgroundColor: "#242c37",
                        height: "30px",
                        width: "100%",
                      }}
                    >
                      <Link
                        style={{ textDecoration: "none", color: "#fff" }}
                        to={`/admin/update/student/${student._id}`}
                      >
                        <span>Update</span>
                      </Link>
                    </button>
                  </td>
                  <td>
                    <button
                      style={{
                        border: "1px solid #242c37",
                        borderRadius: "999px",
                        marginTop: "25px",
                        textAlign: "center",
                        backgroundColor: "#242c37",
                        height: "30px",
                        color: "#fff",
                        width: "100%",
                      }}
                      onClick={() => deleteThisStudent(student._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Base>
  );
};

export default AdminDashboard;
