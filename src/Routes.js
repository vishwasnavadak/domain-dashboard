import React from "react";
import { Router, Route, Redirect } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import HomePage from "./components/HomePage";
import Callback from "./components/Auth/Callback";
import Auth from "./components/Auth/Auth";
import history from "./components/Auth/History";

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const getRoutes = () => {
  return (
    <Router history={history}>
      <div>
        <Route
          exact
          path="/"
          render={props => <HomePage auth={auth} {...props} />}
        />
        <Route
          path="/app"
          render={
            props => (
              // !auth.isAuthenticated() ? (
              //   <Redirect to="/" />
              // ) : (
              <Dashboard auth={auth} {...props} />
            )
            // )
          }
        />
        <Route
          path="/callback"
          render={props => {
            handleAuthentication(props);
            return <Callback {...props} />;
          }}
        />
      </div>
    </Router>
  );
};
