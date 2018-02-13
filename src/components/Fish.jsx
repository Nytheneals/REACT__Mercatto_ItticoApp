import React, { Component } from "react";

// HELPER
import { formatPrice } from "../helpers";
// this.prop.details
class Fish extends Component {
  render() {
    const { details, index } = this.props;
    //BUTTOON CHECKER / TENARY OPERATOR
    const isAvailable = details.status === "available"; //CHECKS IF ITS AVAILABLE
    const buttonText = isAvailable ? "Add To Order" : "Sold Out"; //CHECKS IF AVAILABLE IS TRUE, IF NOT THEN SOLD OUT.

    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.image} />
        <h3 className="fish-name">
          {details.name}
          <span className="price"> {formatPrice(details.price)}</span>
        </h3>
        <p> {details.desc}</p>
        <button
          onClick={() => this.props.addToOrder(index)}
          disabled={!isAvailable}
        >
          {buttonText}
        </button>
      </li>
    );
  }
}

// PROPTYPE VALIDATIONS

Fish.propTypes = {
  details: React.PropTypes.object.isRequired,
  index: React.PropTypes.string.isRequired,
  addToOrder: React.PropTypes.func.isRequired
};

export default Fish;
