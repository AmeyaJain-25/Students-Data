import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { getAllStudents } from "../user/helper/apicalls";
import Base from "./Base";
const Home = () => {
  const [students, setStudents] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getAllStudents(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setStudents(data);
        console.log(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);
  return (
    <Base>
      <div className="container table-container" style={{ minHeight: "100vh" }}>
        <table
          className="table table-hover table-striped text-center sortable"
          style={{
            cursor: "pointer",
            borderRadius: "30px",
            marginTop: "10px",
            backgroundColor: "yellowgreen",
          }}
        >
          <thead>
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
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              return (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.gender}</td>
                  <td>{student.branch}</td>
                  <td>{`${student.birthday.year}-${student.birthday.month}-${student.birthday.day}`}</td>
                  <td>{`${student.address.street}, ${student.address.city}, ${student.address.state}, ${student.address.country}, ${student.address.postalCode}`}</td>
                  <td>{student.email}</td>
                  <td>{student.contactNumber}</td>
                  <td>{student.adhaarCard}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Base>
  );
};

export default Home;
