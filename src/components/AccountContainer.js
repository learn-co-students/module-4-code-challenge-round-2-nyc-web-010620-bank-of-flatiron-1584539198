import React, { Component } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
const TRANSACTURL = 'http://localhost:6001/transactions'

class AccountContainer extends Component {
  state = {
    transactions: []
  }

  componentDidMount() {
    fetch(TRANSACTURL)
    .then(resp => resp.json())
    .then(transactJSON => {
      this.setState({
        transactions: transactJSON
      })
    })
  }

  render() {
    console.log(`current state transactions: ${this.state.transactions}`)
    return (
      <div>
        <Search />
        <AddTransactionForm />
        <TransactionsList />
      </div>
    );
  }
}

export default AccountContainer;
