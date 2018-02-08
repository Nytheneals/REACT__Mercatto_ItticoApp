// let's go!
import React from "react";
import ReactDom from "react-dom";
// import { BrowserRouter, Match, Miss } from "react-router";
// import { Router, Route, Switch } from "react-router";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

//CSS IMPORT
import "./css/style.css";

//COMPONENT IMPORT
import StorePicker from "./components/StorePicker";
import App from "./components/App";
import NotFound from "./components/NotFound";
// CREATING ROUTES

const Root = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={StorePicker} />
          <Route path="/store/:storeId" component={App} />
          <Route component={NotFound} />{" "}
        </Switch>
      </div>
    </Router>
  );
};

ReactDom.render(<Root />, document.querySelector("#main"));
