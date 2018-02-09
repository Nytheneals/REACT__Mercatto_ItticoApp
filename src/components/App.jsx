import React, { Component } from "react";

//COMPONENT IMPORT
import Order from "./Order";
import Header from "./Header";
import Inventory from "./Inventory";

class App extends Component {
  constructor() {
    super();
    //OUR INITIAL STATE
    this.state = {
      fishes: {},
      order: {}
    };
    this.addFish = this.addFish.bind(this);
  }

  addFish(fish) {
    //MAKE A COPY OF THE STATE & UPDATE OUR STATE
    const { fishes } = { ...this.state };
    //ADD A NEW FISH WITH A UNIQUE TIMESTAMP AS KEY
    const timestamp = Date.now();
    // PASSING IN THE FISH FROM ADDFISH COMPONENT ASSIGNING A UNIQUE KEY TO THE FISH

    fishes[`fish-${timestamp}`] = fish; //THIS WILL BE A PROP ON THE BODY/UNIQUE IDENTIFIER
    //SET STATE
    this.setState({ fishes: fishes });
  }
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
        </div>
        <Order />
        <Inventory addFish={this.addFish} />
      </div>
    );
  }
}

export default App;
