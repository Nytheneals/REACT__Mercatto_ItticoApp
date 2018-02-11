import React, { Component } from "react";
import base from "../base";

//COMPONENT IMPORT
import Order from "./Order";
import Header from "./Header";
import Inventory from "./Inventory";
import Fish from "./Fish";
import sampleFishes from "../sample-fishes";

class App extends Component {
  //THIS IS INITIALISED
  constructor() {
    super();
    //OUR INITIAL STATE
    this.state = {
      fishes: {},
      order: {}
    };
    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
  }

  //*****LIFE CVYCLE HOOK*****//
  // THIS GETS IN BEFORE A COMPONENT IS RENDERED ON PAGE
  // ALLOWS US TO SYNC OUR DB WITH STATE..
  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    }); // SYNCING WITH PARTICULAR STORE
  }
  // componentWillUnmount() {
  //   base.removeBinding(this.ref);
  // }

  //***********************TO ADD FISH***********************//
  addFish(fish) {
    // MAKE A COPY OF THE STATE & UPDATE OUR STATE
    const fishes = { ...this.state.fishes };
    // ADD A NEW FISH WITH A UNIQUE TIMESTAMP AS KEY
    const timestamp = Date.now();
    // PASSING IN THE FISH FROM ADDFISH COMPONENT ASSIGNING A UNIQUE KEY TO THE FISH

    fishes[`fish-${timestamp}`] = fish; //THIS WILL BE A PROP ON THE BODY/UNIQUE IDENTIFIER == fish object
    // fish-145125227 :{ name: blalha}  at date.now() key in the fishes object
    // OBJECT LITERAL NOTATION.

    //SET STATE
    this.setState({ fishes: fishes });
    console.log(this.state.fishes);
  }

  //*******************TO LOAD SAMPLE FISH*******************//
  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  //**********************ADD TO ORDER**********************//
  addToOrder(fish) {
    //MAKE A COPY OF THE STATE & UPDATE OUR STATE
    const order = { ...this.state.order };
    //  UPDATE OR ADD THE NEW NUMBER OF FISH ORDERED
    order[fish] = order[fish] + 1 || 1; //THIS WILL EITHER INCREMENT OR CREATE A NEW FISH WHENEVER WE ADD TO ORDER.
    this.setState({ order });
  }

  //********************MAIN COMPONENT********************//
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {/* CHANGING AN OBJECT INTO AN ARRAY AND USING THE KEY AS A UNIQUE KEY, REFER TO SAMPLE DATA FOR FORMAT */}
            {Object.keys(this.state.fishes).map(fish => (
              <Fish
                key={fish}
                index={fish} //AS MY KEY
                details={this.state.fishes[fish]}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} />
        <Inventory loadSamples={this.loadSamples} addFish={this.addFish} />
      </div>
    );
  }
}
export default App;
