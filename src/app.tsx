import * as React from "react";
import * as ReactDOM from "react-dom";

class App extends React.Component {
  render() {
    const reactVersion = require("../package.json").dependencies["react"];

    return (
      <>
        <h1>
          React
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            height="30"
          ></img>
        </h1>
        <p>React Version: {reactVersion}</p>
        <h3>hello micro frontend world</h3>
      </>
    );
  }
}

class Mfe4Element extends HTMLElement {
  connectedCallback() {
    ReactDOM.render(<App />, this);
  }
}

customElements.define("react-element", Mfe4Element);
