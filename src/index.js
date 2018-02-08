// let's go!
import React, { Component } from "react";
import ReactDom from "react-dom";

//CSS IMPORT
import "./css/style.css";

//COMPONENT IMPORT
import StorePicker from "./component/StorePicker";

ReactDom.render(<StorePicker />, document.querySelector("#main"));
