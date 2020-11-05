import { API } from "../backend";

//SIGNUP
export const signup = (user) => {
  return fetch(`${API}/signup`, {
    method: "POST", //Post request.
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//SIGNIN
export const signin = (user) => {
  return fetch(`${API}/signin`, {
    method: "POST", //Post request.
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

//Authenticate
export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

//SIGNOUT
export const signout = (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => {
        console.log("SIGNOUT SUCCESSFULLYYYYY!!!!");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

//Is Authenticated
export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
