import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminDashboard from "./user/AdminDashboard";
import Profile from "./user/Profile";
import PrivateRoutes from "./auth/PrivateRoutes";
import AdminRoutes from "./auth/AdminRoutes";
import AddStudent from "./admin/AddStudent";
import UpdateStudent from "./admin/UpdateStudent";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoutes path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoutes path="/user/profile" exact component={Profile} />
        <AdminRoutes path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoutes
          path="/admin/create/student"
          exact
          component={AddStudent}
        />
        <AdminRoutes
          path="/admin/update/student/:studentId"
          exact
          component={UpdateStudent}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
