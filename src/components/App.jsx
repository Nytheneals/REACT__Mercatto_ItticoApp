import React, { Component } from "react";

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
  }
  // TO LOAD SAMPLE FISH
  loadSamples() {
    this.setState({
      fishes: sampleFishes
    });
  }

  // TO ADD FISH
  addFish(fish) {
    //MAKE A COPY OF THE STATE & UPDATE OUR STATE
    const fishes = { ...this.state.fishes };
    //ADD A NEW FISH WITH A UNIQUE TIMESTAMP AS KEY
    const timestamp = Date.now();
    // PASSING IN THE FISH FROM ADDFISH COMPONENT ASSIGNING A UNIQUE KEY TO THE FISH

    fishes[`fish-${timestamp}`] = fish; //THIS WILL BE A PROP ON THE BODY/UNIQUE IDENTIFIER == fish object
    // fish-145125227 :{ name: blalha}  at date.now() key in the fishes object

    //SET STATE
    this.setState({ fishes: fishes });
    console.log(this.state.fishes);
  }
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="list-of-fishes">
            {/* CHANGING AN OBJECT INTO AN ARRAY AND USING THE KEY AS A UNIQUE KEY, REFER TO SAMPLE DATA FOR FORMAT */}
            {Object.keys(this.state.fishes).map(fish => (
              <Fish key={fish} details={this.state.fishes[fish]} />
            ))}
          </ul>
        </div>
        <Order />
        <Inventory loadSamples={this.loadSamples} addFish={this.addFish} />
      </div>
    );
  }
}

export default App;
