import React, { Component } from "react";
import { formatPrice } from "../helpers";

class Order extends Component {
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  // RENDER INDIVIDUAL FISH ON ORDER
  renderOrder(key) {
    const fish = this.props.fishes[key]; //TAKES KEY OF OBJECT
    const count = this.props.order[key]; // CREATES COUNT

    //IF THERE'S NO FISH OR NO LONGER AVAILABLE
    if (!fish || fish.status === "unavailable") {
      return (
        <li key={key}>
          Sorry, {fish ? fish.name : fish} is no longer available!
        </li>
      );
    }

    //RETURNING FISH IF ITS AVAILABLE..
    return (
      <li key={key}>
        <span>
          {count}lbs {fish.name}
        </span>
        <span className="price">{formatPrice(count * fish.price)}</span>
      </li>
    );
  }

  render() {
    const orderIds = Object.keys(this.props.order); //GETTING KEYS OFF ORDERS
    // REDUCING THE TOTAL OF FISH ORDERED
    const total = orderIds.reduce((prevTotal, key) => {
      const fish = this.props.fishes[key];
      const count = this.props.order[key];
      const isAvailable = fish && fish.status === "available"; //CHECK WHETHER THE FISH IS AVAILABLE.
      if (isAvailable) {
        return prevTotal + (count * fish.price || 0);
      }
      return prevTotal;
    }, 0);

    return (
      <div className="order-wrap">
        <h2>Your Order</h2>
        <ul className="order">
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </ul>
      </div>
    );
  }
}

export default Order;
