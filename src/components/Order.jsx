import React, { Component } from "react";
import { formatPrice } from "../helpers";
import CSSTransitionGroup from "react-addons-css-transition-group";

class Order extends Component {
  constructor() {
    super();
    this.renderOrder = this.renderOrder.bind(this);
  }

  // RENDER INDIVIDUAL FISH ON ORDER
  renderOrder(key) {
    const fish = this.props.fishes[key]; //TAKES KEY OF OBJECT
    const count = this.props.order[key]; // CREATES COUNT
    const removeButton = (
      <button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
    );

    //IF THERE'S NO FISH OR NO LONGER AVAILABLE
    if (!fish || fish.status === "unavailable") {
      return (
        <li key={key}>
          Sorry, {fish ? fish.name : fish} is no longer available!
          {removeButton}
        </li>
      );
    }

    //RETURNING FISH IF ITS AVAILABLE..
    return (
      <li key={key}>
        <span>
          <CSSTransitionGroup
            component="span"
            className="count"
            transitionName="count"
            transitionEnterTimeout={250}
            transitionLeaveTimeout={250}
          >
            <span key={count}>{count}</span>
          </CSSTransitionGroup>
          lbs {fish.name} {removeButton}
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

        <CSSTransitionGroup
          className="order"
          component="ul"
          transitionName="order"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {orderIds.map(this.renderOrder)}
          <li className="total">
            <strong>Total:</strong>
            {formatPrice(total)}
          </li>
        </CSSTransitionGroup>
      </div>
    );
  }
}

export default Order;
