import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Match, Miss } from "react-router";

//CSS IMPORT
import "./css/style.css";

//COMPONENT IMPORT
import "./css/style.css";
import App from "./components/App";
import StorePicker from "./components/StorePicker";
import NotFound from "./components/NotFound";
// CREATING ROUTES

// const repo = `/${window.location.pathname.split('/')[1]}`;

const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={StorePicker} />
        <Match pattern="/store/:storeId" component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  );
};

ReactDom.render(<Root />, document.querySelector("#main"));
