import { API } from "../../backend";

export const getAllStudents = (userId, token) => {
  return fetch(`${API}/students/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createStudent = (userId, token, student) => {
  return fetch(`${API}/createstudent/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(student),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
  console.log(student);
};

export const deleteStudent = (studentId, userId, token) => {
  return fetch(`${API}/deletestudent/${studentId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getStudent = (studentId, userId, token) => {
  return fetch(`${API}/student/${studentId}/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateStudent = (studentId, userId, token, student) => {
  return fetch(`${API}/updatestudent/${studentId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(student),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
