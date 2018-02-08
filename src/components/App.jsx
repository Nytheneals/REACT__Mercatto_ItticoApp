import React, { Component } from "react";

//COMPONENT IMPORT
import Order from "./Order";
import Header from "./Header";
import Inventory from "./Inventory";

class App extends Component {
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory />
      </div>
    );
  }
}

export default App;
