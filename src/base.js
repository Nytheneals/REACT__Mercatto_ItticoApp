import { Rebase } from "re-base";

// CONNECTING TO OUR REALTIME DATABASE (FIRE BASE)
const base = Rebase.createClass({
  apiKey: "AIzaSyDeTeRT2TALy_dktDYyWQgl-s_P4Ha3lkE",
  authDomain: "catch22-9d317.firebaseapp.com",
  databaseURL: "https://catch22-9d317.firebaseio.com"
});

export default base;
