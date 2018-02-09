import React, { Component } from "react";
import AddFishForm from "./AddFishForm";

class Inventory extends Component {
  render() {
    return (
      <div>
        <p>Inventory</p>
        <AddFishForm />
      </div>
    );
  }
}

export default Inventory;
