import React from "react";
import Menu from "./Menu";

const Base = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: "#354152",
        color: "#7e8ba3",
        margin: "0",
        padding: "0",
      }}
    >
      <Menu />
      <div className="container-fuild">
        <div>{children}</div>
      </div>
      <footer className="footer text-center bg-dark mt-auto py-3">
        <div>FOOTER</div>
        {/* <div className="container-fluid bg-success text-white text-center py-3">
          <h4>If you got any questions, feel free to ask.</h4>
          <button className="btn btn-warning btn-lg">Contact Us</button>
        </div>
        <div className="container">
          <span className="text-muted">
            An Amazing <span className="text-white">MERN</span> Bootcamp
          </span>
        </div> */}
      </footer>
    </div>
  );
};

export default Base;
