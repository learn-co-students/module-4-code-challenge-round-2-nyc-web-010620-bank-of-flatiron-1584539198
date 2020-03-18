import React, { Component } from "react";
import AccountContainer from "./AccountContainer";
import "../stylesheets/App.css";

class App extends Component {
  state = {
    transactions: []
  }

  componentDidMount() {
    fetch('http://localhost:3000/transactions')
      .then(response => response.json())
      .then(transactions => this.setState({ transactions }));
  }

  render() {
    // console.log(this.state.transactions)
    return (
      <div className="ui raised segment">
        <div className="ui segment violet inverted">
          <h2>The Royal Bank of Flatiron</h2>
        </div>
        <AccountContainer transactions={this.state.transactions}/>
      </div>
    );
  }
}

export default App;
