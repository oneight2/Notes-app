import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from "../Login";
import Register from "../Register";
import Dashboard from "../Dashboard";
import Header from "../../../components/header";

function App() {
  return (
    <div>
      <Header />
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
