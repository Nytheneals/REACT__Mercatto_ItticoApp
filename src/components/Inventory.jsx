import React, { Component } from "react";
import AddFishForm from "./AddFishForm";
import base from "../base";

class Inventory extends Component {
  constructor() {
    super();
    this.renderInventory = this.renderInventory.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticate = this.authenticate.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logout = this.logout.bind(this);
    // NOTHING BY DEFAULT
    this.state = {
      uid: null,
      owner: null
    };
  }

  // HELP WITH LOGIN WHEN PAGE IS REFRESHED
  componentDidMount() {
    base.onAuth(user => {
      if (user) {
        this.authHandler(null, { user });
      }
    });
  }

  handleChange(e, key) {
    const fish = this.props.fishes[key];
    // TAKE A COPY OF THAT FISH AND UPDATE IT WITH THE NEW DATA
    const updatedFish = { ...fish, [e.target.name]: e.target.value }; // DYNAMIC METHOD OF GETTING GENERATED INFO
    this.props.updateFish(key, updatedFish);
  }
  // AUTHENTICATE METHOD
  authenticate(provider) {
    console.log(`you are trying to log in with ${provider}`);
    base.authWithOAuthPopup(provider, this.authHandler);
  }

  // LOG OUT
  logout() {
    base.unauth();
    this.setState({ uid: null });
  }

  // RUNS WHEN THE OUTH POPs UP

  authHandler(err, authData) {
    console.log(authData);
    if (err) {
      console.log(err);
      return;
    }

    // GRAB THE STORE INFO, FROOM FIREBASE API
    const storeRef = base.database().ref(this.props.storeId);

    // QUERY FIREBASE O=NCE FOR THE STORE DATA
    storeRef.once("value", snapshot => {
      const data = snapshot.val() || {}; // CALL .VAL TO PULL DATA

      // CLAIMING DATA IF THEREs NO OWNER ALREADY
      if (!data.owner) {
        storeRef.set({
          owner: authData.user.uid
        });
      }

      // UPDATING LOCAL STATE

      this.setState({
        uid: authData.user.uid,
        owner: data.owner || authData.user.uid
      });
    });
  }
  //RENDERING THE LOGIN FEATURES
  renderLogin() {
    return (
      <nav className="login">
        <h2>Inventory</h2>
        <p>Sign in to manage your store's inventory</p>
        <button className="github" onClick={() => this.authenticate("github")}>
          Log In with Github
        </button>
        <button
          className="facebook"
          onClick={() => this.authenticate("google")}
        >
          Log In with Google
        </button>
        <button
          className="twitter"
          onClick={() => this.authenticate("twitter")}
        >
          Log In with Twitter
        </button>
      </nav>
    );
  }

  renderInventory(key) {
    const fish = this.props.fishes[key];
    return (
      <div className="fish-edit" key={key}>
        <input
          type="text"
          name="name"
          value={fish.name}
          placeholder="Fish Name"
          onChange={e => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="price"
          value={fish.price}
          placeholder="Fish Price"
          onChange={e => this.handleChange(e, key)}
        />
        <select
          type="text"
          name="status"
          value={fish.status}
          placeholder="Fish Status"
          onChange={e => this.handleChange(e, key)}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          type="text"
          name="desc"
          value={fish.desc}
          placeholder="Fish Desc"
          onChange={e => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="image"
          value={fish.status}
          placeholder="Fish Image"
          onChange={e => this.handleChange(e, key)}
        />
        <button onClick={() => this.props.removeFish(key)}>Delete Fish</button>
      </div>
    );
  }
  render() {
    //LOGG OUT BUTTON
    const logout = <button onClick={this.logout}>Log Out!</button>;

    // CHECK IF THEY ARENOT LOGGED IN
    if (!this.state.uid) {
      return <div>{this.renderLogin()}</div>;
    }

    // CHECK IF THEY ARE THE OWNER OF THE CURRENT store
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you aren't the owner of this store</p>
          {logout}
        </div>
      );
    }
    return (
      <div>
        <h2>Inventory</h2>
        {logout}
        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />
        <button onClick={this.props.loadSamples}>Load Sample Fishes</button>
      </div>
    );
  }
}

// PROPTYPE VALIDATIONS
Inventory.propTypes = {
  fishes: React.PropTypes.object.isRequired,
  removeFish: React.PropTypes.func.isRequired,
  updateFish: React.PropTypes.func.isRequired,
  loadSamples: React.PropTypes.func.isRequired,
  storeId: React.PropTypes.string.isRequired
};

export default Inventory;
