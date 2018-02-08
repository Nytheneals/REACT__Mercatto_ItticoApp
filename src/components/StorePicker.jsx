import React, { Component } from "react";
// import ReactDom from "react-dom";
import { getFunName } from "../helpers";

class StorePicker extends Component {
  constructor() {
    super();
    this.goToStore = this.goToStore.bind(this);
  }
  goToStore(e) {
    e.preventDefault();
    console.log(this.storeInput.value);
    // Grab text from store
  }
  render() {
    return (
      <div>
        <form className="store-selector" onSubmit={this.goToStore}>
          <h2>Please Enter Store</h2>
          <input
            type="text"
            required
            placeholder="Store Name"
            defaultValue={getFunName()}
            // WHEN THE INPUT IS RENDERED ITS GOING TO PUT A REFERENCE ON THE CLASS
            ref={input => {
              this.storeInput = input;
            }}
          />
          <button type="submit">Visit Store --></button>
        </form>
      </div>
    );
  }
}

export default StorePicker;
