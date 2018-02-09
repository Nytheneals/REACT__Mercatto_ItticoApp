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
    // Grab text from store
    const storeId = this.storeInput.value;
    console.log(storeId);
    // TRANSISTIONING FROM '/' TO '/STORE/:STOREID'
    // this.context.router.transitionTo(`/store/${storeId}`);
    this.props.history.push(`store/${this.storeInput.value}`);
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

//ACCESSING THE ROUTER IN THIS COMPONENT
// StorePicker.contextTypes = {
//   router: React.PropTypes.Object
// };
export default StorePicker;
